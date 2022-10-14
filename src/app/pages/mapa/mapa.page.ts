import { Component, OnInit} from '@angular/core';
import { Marker } from '../../interfaces/interfaces';
import { ProveedorService } from '../../services/proveedor.service';
import { Geolocation} from '@capacitor/geolocation';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  public prueba;
  public filteredMarkers;

  public colorFiltro: string = 'light';
  public markers = [] //: Marker[];
  public filtroOn: boolean;
  public aLeyenda = [];

  //Por definir tipos (any)
  public map; 
  public mapEle: HTMLElement;
  public indicatorsEle: HTMLElement;
  public currentDestino = {}
  public currentMarcador;
  public flagCurrent = 0;
  public buttonRuta:string[] = ['navigate','success']
  public navigationMode = false;
  public directionsService = new google.maps.DirectionsService();
  public directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers:true});
  public marcadorGoogle;
  public miPos;
  public aMarkers = [];
  public infoWindows = [];
  
  public filtros = { Tipo: [], Zona: [], Fecha: [] };
  public mapcolors = {
    "Mi ubicación":"my_location",
    "Terremoto": 'purple',
    "Tsunami": 'blue',
    "Incendio": 'red',
    "Inundación": 'green',
    "Sequía": 'yellow'
  };

  constructor( 
    public proveedor: ProveedorService, 
    private screenOrientation: ScreenOrientation,
  ) {}

  //Init
  ngOnInit() {
    this.screenOrientation.unlock()
    this.proveedor.obtenerDatos().subscribe(
      (data) => {   
        this.filtrarData(data)
        this.loadMap();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Obtiene la posicion actual y genera marcador en el mapa
  fetchLocation(){
    Geolocation.getCurrentPosition().then(res =>{ 
      this.miPos = {
        lat: res.coords.latitude, 
        lng: res.coords.longitude 
      }
      this.map.setCenter(this.miPos);
      new google.maps.Marker({
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


  //Filtra datos necesarios para esta vista
  filtrarData(data){
    for (let i = 0; i < data.length; i++) {
      let sliced = Object.keys(data[i]).slice(0, 9).reduce((result, key) => { result[key] = data[i][key]; return result;}, {});
      this.markers.push(sliced)
    } 
  }

  // Google Maps Api
  //---------------------------------------------------------------------------------------------------

  //Creacion del mapa
  loadMap() {
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
        url: '../../assets/icon/' + this.mapcolors[marker.tipo] + '.png',
      },
    });
    this.aMarkers.push(marcadorGoogle);
    this.setInfoWindow(marcadorGoogle);

    //Se agrega tipo, zona y fecha a los filtros sin repeticion
    if (this.filtros.Tipo.filter(e => e.valor === marcadorGoogle.tipo).length === 0) {
      this.filtros.Tipo.push({valor: marcadorGoogle.tipo, isChecked:true});  
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
                          marcadorGoogle.tipo +
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
                          "<div style='text-align:center'><ion-button style='margin-bottom:2vh'shape='round' href='/camara/" +
                          marcadorGoogle.id +
                          "' size='small'>Ver Antes/Después</ion-button></div>" +
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


}
