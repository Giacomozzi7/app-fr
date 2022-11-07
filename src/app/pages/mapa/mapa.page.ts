import { Component, OnInit} from '@angular/core';
import { Marker } from '../../interfaces/interfaces';
import { ProveedorService } from '../../services/proveedor.service';
import { Geolocation} from '@capacitor/geolocation';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { ToastController } from '@ionic/angular';


declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  
  mapEle:         HTMLElement;
  indicatorsEle:  HTMLElement;
  colorFiltro:    string = 'light';
  markers:        Marker[]//: Marker[];
  filtroOn:       boolean;
  buttonRuta:     string[] = ['navigate','success']
  flagCurrent:    Number = 0;
  navigationMode: boolean = false;
  toastNavText:   string = 'activado'

  aLeyenda = [];

  //Por definir tipos (any)
  prueba;
  filteredMarkers;
  map; 
  currentDestino = {}
  currentMarcador;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers:true});
  marcadorGoogle;
  miPos;
  aMarkers = [];
  infoWindows = [];
  watch;
  latitude
  longitude
  myMarker;
  
  filtros = { Tipo: [], Zona: [], Fecha: [] };
  mapcolors = {
    "Mi ubicación":"my_location",
    "Terremoto": 'purple',
    "Tsunami": 'blue',
    "Incendio": 'red',
    "Inundación": 'green',
    "Sequía": 'yellow'
  };

  constructor( 
    private toastController: ToastController,
    public proveedor: ProveedorService, 
    private screenOrientation: ScreenOrientation,
  ) {}

  //Init
  ngOnInit() {
    this.screenOrientation.lock('portrait').catch((error) => {
      console.log('Función Nativa : No permitida en Browser');
    });
    this.proveedor.obtenerMapPins().subscribe(
      (data: Marker[]) => {  
        this.markers = data
        this.loadMap();
        console.log(this.aMarkers)
        this.watcherPosition();
        }
        )
      ,
      (error) => {
        console.log(error);
      }    
  }

  async obtainCategoria(){
    this.proveedor.obtenerCategorias().subscribe((data) =>{
      let dataN = data
      this.markers.forEach(marker =>{
        for (let i = 0; i<5; i++){
          if (dataN[i]['id'] === marker.categoria){
            marker.categoria = dataN[i]['tipo']
          }
        }
      })
    }) 
    return;
  }

  watcherPosition(){
    this.watch = Geolocation.watchPosition({
      enableHighAccuracy:true,
    },
    (coordinates)=> {
      if (coordinates !== null){
        this.myMarker.setPosition(
          new google.maps.LatLng(coordinates.coords.latitude, coordinates.coords.longitude)
        )
      }
    })

  }

  //Obtiene la posicion actual y genera marcador en el mapa
  fetchLocation(){
    Geolocation.getCurrentPosition().then(res =>{ 
      this.miPos = {
        lat: res.coords.latitude, 
        lng: res.coords.longitude 
      }
      this.map.setCenter(this.miPos);
      this.myMarker = new google.maps.Marker({
        position: this.miPos,
        map: this.map,
        icon: {
          url: '../../assets/icon/my_location.png',
        }
      });

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        this.mapEle.classList.add('show-map');
        this.renderMarkers();
        this.filtros.Fecha.sort((a,b) => { return parseInt(a.valor.split(' ')[0]) - parseInt(b.valor.split(' ')[0])});    
      });
    }) 
  }

  // Google Maps Api
  //---------------------------------------------------------------------------------------------------

  //Creacion del mapa
  async loadMap() {
    await this.obtainCategoria();
    // Definicion del mapa y zoom
    this.mapEle = document.getElementById('map');
    this.indicatorsEle = document.getElementById('indicators');
    this.map = new google.maps.Map(this.mapEle, {
      zoom: 15,
    });

    this.fetchLocation()
    
  }

  //Renderiza marcadores a partir de arreglo de marcadores
  renderMarkers() {
    this.markers.forEach((marker) => {
      this.addMarker(marker);
    });
  }


  //Oculta los marcadores sin removerlos del mapa
  hideMarkers(h: boolean){
    this.aMarkers.forEach((marker)=>{
      if (marker!= this.currentMarcador){
        marker.setVisible(!h);
      }
    });
  }

  //añade un marcador
  addMarker(marker: Marker) {
    let marcadorGoogle = new google.maps.Marker({
      ...marker,
      position: marker.pos_evento,
      map: this.map,
      icon: {
        url: '../../assets/icon/' + this.mapcolors[marker.categoria] + '.png',
      },
    });
    this.aMarkers.push(marcadorGoogle);
    this.setInfoWindow(marcadorGoogle);

    //Se agrega tipo, zona y fecha a los filtros sin repeticion
    if (this.filtros.Tipo.filter(e => e.valor === marcadorGoogle.categoria).length === 0) {
      this.filtros.Tipo.push({valor: marcadorGoogle.categoria, isChecked:true});  
    }

    if (this.filtros.Zona.filter(e => e.valor === marcadorGoogle.zona).length === 0) {
      this.filtros.Zona.push({valor: marcadorGoogle.zona, isChecked:true});  
    }
    
    this.filtrarFecha(marcadorGoogle)
  }

  //Transforma la fecha segun decada
  filtrarFecha(marcadorGoogle){
    let fecha = marcadorGoogle.fecha.split('-');
    let date = new Date(fecha[2], fecha[1] - 1, fecha[0]);

    //Obtencion de decadas
    let lowerDecade  = this.rangoFechas(date , 10)
    let upperDecade  = this.rangoFechas(date , 10, 9)
    let finalDecade = lowerDecade.toString() + " - " + upperDecade.toString()

    //Se agrega al arreglo de fechas sin repeticion
    if (this.filtros.Fecha.filter(e => e.valor === finalDecade).length === 0){
      this.filtros.Fecha.push({valor: finalDecade, isChecked:true});
    }
  }

  //Permite obtener la decada de cada fecha
  rangoFechas(fecha, regla, sum = 0){
    return Math.floor(fecha.getFullYear() / regla) * regla + sum
  }

  //Añade un infowindow a cada marcador asignado al mapa
  setInfoWindow(marcadorGoogle) {
    let contentString =
                          '<div>' +
                          "<h5 style='color:black;'>" +
                          marcadorGoogle.titulo +
                          ' - ' +
                          marcadorGoogle.categoria +
                          '</h5>' +
                          "<h6 style='color:black; margin-left:1px;'> " +
                          marcadorGoogle.zona +
                          '</h6>' +
                          "<p style='color:black;'>" +
                          marcadorGoogle.descripcion +
                          '</p>' +
                          "<p style='color:grey'> Fecha: " +
                          marcadorGoogle.fecha +
                          '</p>' +
                          "<div style='text-align:center'><ion-button shape='round' href='/camara/" +
                          marcadorGoogle.id +
                          "' size='small'><ion-icon slot='start' name='camera'></ion-icon>Ver Antes/Después</ion-button>" +
                          "<ion-button style='margin-bottom:2vh' shape='round' href='/escenario/" + 
                          marcadorGoogle.escenario_id +
                          "' size='small' color='warning'><ion-icon slot='start' name='map'></ion-icon>Ver Escenario</ion-button></div>"
                          '</div>';

    let infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    //Listener para el evento Click sobre marcador
    marcadorGoogle.addListener('click', () => {
      this.cerrarInfoWindows();
      infowindow.open({
        anchor: marcadorGoogle,
        map: this.map,
        shouldFocus: true,
      });

      this.currentDestino = {
        lat: marcadorGoogle.pos_evento['lat'],
        lng: marcadorGoogle.pos_evento['lng']
      }

      this.currentMarcador = marcadorGoogle;
      this.flagCurrent = 1

    });
    
    this.infoWindows.push(infowindow);

    //Handler close infowindow
    infowindow.addListener('closeclick', ()=>{
      this.currentDestino = {}
      this.flagCurrent = 0;

    })
  }


  //Cerrar todas las infowindows al abrir una nueva
  cerrarInfoWindows() {
    this.infoWindows.forEach((window) =>{
      window.close();
    })
  }

  //Recibe cambio de color desde componente filtros
  recibirColor($event) {
    this.colorFiltro = $event
    
  }

  calculateRoute() {
    if (this.buttonRuta.includes('navigate')){
      if(Object.keys(this.currentDestino).length > 0){
        this.directionsService.route({
          origin: this.miPos,
          destination: this.currentDestino,
          travelMode: google.maps.TravelMode.DRIVING,
        }, (response, status)  => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.directionsRenderer.setDirections(response);
            this.directionsRenderer.setMap(this.map);
          } 
          else {
            alert('No se puede renderizar. Razon: ' + status);
          }
        });

        this.cerrarInfoWindows()
        this.hideMarkers(true);
        this.buttonRuta = ['stop','danger']
        this.navigationMode = true;
        
      }
    } 
    else {
      this.directionsRenderer.setMap(null);
      this.hideMarkers(false);
      this.buttonRuta = ['navigate','success']
      this.currentDestino = {}
      this.flagCurrent = 0;
      this.map.setCenter(this.miPos);
      this.map.setZoom(15)
      this.navigationMode = false;

    }


  }
  
  //Toast cambio modo navegacion
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Modo navegación '+ this.toastNavText,
      duration: 1500,
      icon: 'car',
      position: 'top'
    });

    await toast.present();

    this.toastNavText === 'desactivado'
      ? this.toastNavText = 'activado'
      : this.toastNavText = 'desactivado'
  }


}
