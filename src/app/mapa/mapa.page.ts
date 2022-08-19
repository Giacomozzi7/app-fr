import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AlertController } from '@ionic/angular';
import { Marker } from '../../interfaces/marker';
import markerJson from '../../markers/markers.json'

declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.css'],
})
export class MapaPage implements OnInit {
  filtros = {'Tipo':[], 'Zona': [], 'Fecha': []}
  filtroTipo;
  filtroZona;
  map = null;
  markers = markerJson as Marker[];
  marcadorGoogle;
  aMarkers = []
  miPos;
  posActual;
  infowindows: any = []
  mapcolors = {
    'Terremoto':'purple',
    'Tsunami':'blue',
    'Incendio':'red'
  }

  constructor(private geolocation: Geolocation, private alertController: AlertController) {}

  //Init
  ngOnInit(){
    this.loadMap()
    this.filtroTipo = this.filtros.Tipo;
    this.filtroZona = this.filtros.Zona;
  }


  // Google Maps Api
  //---------------------------------------------------------------------------------------------------

  //Creacion del mapa
  loadMap() {
    // Definicion del mapa y zoom
    const mapEle: HTMLElement = document.getElementById('map');
    this.map = new google.maps.Map(mapEle, {
      zoom: 15
    });


    //Obtener ubicacion y setear centro al iniciar
    this.geolocation.getCurrentPosition().then( pos =>{
      this.miPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
      this.map.setCenter(this.miPos)
      new google.maps.Marker({
        position: this.miPos,
        map: this.map,
        icon:{
          url:"https://www.shareicon.net/data/32x32/2015/11/02/665860_map_512x512.png"
        }
      })}
      
    )
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.renderMarkers();
    });
  }

  //Renderiza marcadores a partir de arreglo de marcadores
  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
      
    });
  }

  //añade un marcador
  addMarker(marker: Marker) {
    let marcadorGoogle = new google.maps.Marker({
      position: marker.pos,
      map: this.map,
      title: marker.titulo,
      tipo: marker.tipo,
      descripcion: marker.descrip,
      fecha: marker.fecha,
      zona: marker.zona,
      icon:{
        url:'../../assets/icon/'+ this.mapcolors[marker.tipo] +'.png'
      }
    });
    this.aMarkers.push(marcadorGoogle);
    this.setInfoWindow(marcadorGoogle);

    //Se agrega tipo, zona y fecha a los filtros sin repeticion
    !this.filtros.Tipo.includes(marcadorGoogle.tipo) && this.filtros.Tipo.push(marcadorGoogle.tipo)
    !this.filtros.Zona.includes(marcadorGoogle.zona) && this.filtros.Zona.push(marcadorGoogle.zona)
    !this.filtros.Fecha.includes(marcadorGoogle.fecha) && this.filtros.Fecha.push(marcadorGoogle.fecha)
  }

  
  //Añade un infowindow a cada marcador asignado al mapa
  setInfoWindow(marcadorGoogle){
    let contentString = '<div id="content">' +
                          "<h5 style='color:black;'>" + marcadorGoogle.title + " - "  + marcadorGoogle.tipo +"</h5>" +
                          "<h6 style='color:black; margin-left:1px;'> " + marcadorGoogle.zona + "</h6>" +
                          "<p style='color:black;'>"  + marcadorGoogle.descripcion + "</p>" +
                          "<p style='color:grey'> Fecha: " + marcadorGoogle.fecha + "</p>"+
                        '</div>';

    let infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    //Listener para el evento Click sobre marcador
    marcadorGoogle.addListener("click", () => {
      this.cerrarInfoWindows();
      infowindow.open({
        anchor: marcadorGoogle ,
        map: this.map,
        shouldFocus: true,
      });
    });
    this.infowindows.push(infowindow);

  }

  //Cerrar todas las infowindows al abrir una nueva
  cerrarInfoWindows(){
    for(let window of this.infowindows){window.close()}
  }

  //Quita los marcadores del mapa
  quitarMarkers(){
    this.aMarkers.forEach(mk => {mk.setMap(null)});
  }


  //SetChecked filtros
  setChecked(tp,btn_string){
    if(btn_string === 'Tipo'){return this.filtroTipo.includes(tp)}
    if(btn_string === 'Zona'){return this.filtroZona.includes(tp)}
   
  }

  //Renderiza nuevamente los marcadores aplicando filtros
  resetMarkers(){
    this.aMarkers.forEach(mk =>{
      if (this.filtroTipo.includes(mk.tipo) & this.filtroZona.includes(mk.zona)) {
        mk.setMap(this.map) 
      }
    })

  }
  //Control de alertas
  //--------------------------------------------------------------------------------------------------------------------------

  //Presiona sobre el icono de leyenda
  async pressLeyenda() {
    //Construccion de tabla de marcadores
    let msg = "<table> "
    Object.keys(this.mapcolors).forEach(key => {
      msg+= "<tr><td><img src = '../../assets/icon/"+ this.mapcolors[key] +".png'> <td class ='td-tipo'>"+ key + "</td></tr>"
    });
    msg+= "</table>"

    //Creacion de alerta y asignacion de mensajes
    const alert = await this.alertController.create({
      header: 'Leyenda',
      cssClass: 'custom-alert',
      message: msg,
      buttons:['Volver']
    });

    await alert.present();
  }

  //Presiona sobre el icono de filtro
  async pressFiltro(btn_string:string) {
    //Inicializa un arreglo en base a los filtros existentes
    let aInputs = [];

    this.filtros[btn_string].forEach(tp =>{   
      let oTP = { 
        label: tp,
        type: 'checkbox',
        value: tp,
        checked : this.setChecked(tp, btn_string)
      } 
      aInputs.push(oTP)
    })

    const alert = await this.alertController.create({
      header: 'Seleccionar categoría',
      cssClass: 'custom-alert',
      inputs: aInputs,
      buttons:[{
        text:'Aceptar',
        handler: res =>{
          if (btn_string === 'Tipo') {this.filtroTipo = res}
          if (btn_string === 'Zona') {this.filtroZona = res}
          this.quitarMarkers();
          this.resetMarkers();       
        }
      }],
    });

      await alert.present();
    
  }


}
