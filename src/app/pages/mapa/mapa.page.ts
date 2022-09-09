import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AlertController, AlertInput, IonItem, IonModal, IonSlides } from '@ionic/angular';
import { Marker} from '../../interfaces/interfaces';
import { ProveedorService } from '../../services/proveedor.service';

declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  public markers: Marker[];
  public filtroOn: boolean;
  public aLeyenda = [];

  //Por definir tipos (any)
  public map; 
  public marcadorGoogle;
  public miPos;
  public aMarkers = [];
  public infoWindows = [];
  public colorFiltro: string = 'dark';

  public filtros = { Tipo: [], Zona: [], Fecha: [] };

  public mapcolors = {
    "Mi ubicación":"my_location",
    "Terremoto": 'purple',
    "Tsunami": 'blue',
    "Incendio": 'red',
    "Inundación": 'green',
    "Sequía": 'yellow'
  };

  @ViewChildren('itemTipo') itemTipo: QueryList<IonItem>;
  @ViewChildren('itemZona') itemZona: QueryList<IonItem>;
  @ViewChildren('itemFecha') itemFecha: QueryList<IonItem>;
  @ViewChild('modal') modal: IonModal;
  @ViewChild('mySlider') mySlider: IonSlides;


  constructor(
    private geolocation: Geolocation,
    private alertController: AlertController,
    public proveedor: ProveedorService,
  ) {}

  //Init
  ngOnInit() {
    this.proveedor.obtenerDatos().subscribe(
      (data: Marker[]) => {
        this.markers = data;
        this.loadMap();
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Google Maps Api
  //---------------------------------------------------------------------------------------------------

  //Creacion del mapa
  loadMap() {
    // Definicion del mapa y zoom
    const mapEle: HTMLElement = document.getElementById('map');
    this.map = new google.maps.Map(mapEle, {
      zoom: 15,
    });

    //Obtener ubicacion y setear centro al iniciar
    this.geolocation.getCurrentPosition().then((pos) => {
      this.miPos = new google.maps.LatLng(
        pos.coords.latitude,
        pos.coords.longitude
      );
      this.map.setCenter(this.miPos);
      new google.maps.Marker({
        position: this.miPos,
        map: this.map,
        icon: {
          url: '../../assets/icon/my_location.png',
        },
      });
    });
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.renderMarkers();
      this.filtros.Fecha.sort((a,b) => { return parseInt(a.valor.split(' ')[0]) - parseInt(b.valor.split(' ')[0])});
      this.generarLeyenda();
    });
  }

  //Renderiza marcadores a partir de arreglo de marcadores
  renderMarkers() {
    this.markers.forEach((marker) => {
      this.addMarker(marker);
    });
  }

  //añade un marcador
  addMarker(marker: Marker) {
    let marcadorGoogle = new google.maps.Marker({
      ...marker,
      position: marker.pos,
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

  //Handler select (Modal filtro)
  handleChange(ev){
    let change = ev.target.value;
    this.mySlider.lockSwipes(false)
    if (change=='categoria') this.mySlider.slideTo(0);
    if (change == 'fecha')   this.mySlider.slideTo(2);
    if (change=='zona')      this.mySlider.slideTo(1);
    this.mySlider.lockSwipes(true)
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
                          marcadorGoogle.descrip +
                          '</p>' +
                          "<p style='color:grey'> Fecha: " +
                          marcadorGoogle.fecha +
                          '</p>' +
                          "<div style='text-align:center'><ion-button style='margin-bottom:2vh'shape='round' href='/memoria/" +
                          marcadorGoogle.id +
                          "' size='small'>Ver Memoria</ion-button></div>" +
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
    });
    this.infoWindows.push(infowindow);
  }

  //Cerrar todas las infowindows al abrir una nueva
  cerrarInfoWindows() {
    this.infoWindows.forEach((window) =>{
      window.close();
    })
  }

  //Quita los marcadores del mapa
  quitarMarkers() {
    this.aMarkers.forEach((mk) => {
      mk.setMap(null);
    });
  }

  aplicarFiltro(){
    let arrayChecked: string[] = [];
    
    let arrayFiltros = [
      this.itemTipo.toArray(),
      this.itemZona.toArray(),
      this.itemFecha.toArray()
    ]
    this.modal.dismiss()

    Object.keys(this.filtros).forEach((cat,index) =>{
      this.filtros[cat] = []

      arrayFiltros[index].forEach(val =>{
        let valor = val['el'].innerText
        let isChecked = val['el']['children'][0]['attributes']['aria-checked']['value']
        this.filtros[cat].push({valor, isChecked})  
        arrayChecked.push(isChecked)

      })
    })
    this.quitarMarkers();
    this.resetMarkers();
    //Cambia el color del icono de filtro si se activa
    arrayChecked.includes("false") ? this.colorFiltro = 'success' : this.colorFiltro = 'dark'
    
  }

  //Vuelve a renderizar los marcadores aplicando filtros
  resetMarkers(){
    this.aMarkers.forEach((mk) => {
      let a = this.filtros.Tipo.filter(e => e.valor === mk.tipo && e.isChecked === "true").length > 0
      let b = this.filtros.Zona.filter(e => e.valor === mk.zona && e.isChecked === "true").length > 0
      let c = this.filtros.Fecha.filter(e => 
        parseInt(e.valor.split('-')[0]) <= parseInt(mk.fecha.split('-')[2])  
        && 
        parseInt(e.valor.split('-')[1]) >= parseInt(mk.fecha.split('-')[2])
        &&
        e.isChecked === "true").length > 0

      if (a && b && c) mk.setMap(this.map);  
    });
  }

  //Genera un arreglo con objetos pertenecientes a la leyenda
  generarLeyenda(){
    Object.keys(this.mapcolors).forEach((key) => {
      let ob = {
            nombre: key,
            url: '../../assets/icon/' + this.mapcolors[key] + '.png'
      }
      this.aLeyenda.push(ob) 
    });
  }

  //Control de alertas
  //--------------------------------------------------------------------------------------------------------------------------

  //Presiona sobre el icono de leyenda
  async pressLeyenda() {

    //Construccion de tabla de marcadores
    let msg = '<table> ';
    Object.keys(this.mapcolors).forEach((key) => {
      msg +=
        "<tr><td><img src = '../../assets/icon/" +
        this.mapcolors[key] +
        ".png' > <td class ='td-tipo'>" +
        key +
        '</td></tr>';
    });
    msg += '</table>';
    console.log(msg)

    //Creacion de alerta y asignacion de mensajes
    const alert = await this.alertController.create({
      header: 'Leyenda',
      cssClass: 'custom-alert',
      message: msg,
      buttons: ['Volver'],
    });

    await alert.present();
  }

}
