import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ToastController } from '@ionic/angular';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { ValUser } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.page.html',
  styleUrls: ['./valoraciones.page.scss'],
})
export class ValoracionesPage implements OnInit {
  profileId:           string;
  refMemoria:          string;
  baseColors:          string[]= ['','','','','']
  inmersionColors:     string[];
  interesColors:       string[];
  valoracionInteres:   number;
  valoracionInmersion: number;
  changeBackground:    string;
  enviarTexto:         string = 'Valorar'
  usuarioId:           string = '632a072930305800b2d85221'
  valoracion:          ValUser;


  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    public proveedor: ProveedorService,
    private screenOrientation: ScreenOrientation
  ) { }

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.refMemoria = 'memoria/'+ this.profileId;
    this.screenOrientation.lock('portrait').catch((error) => {
      console.log('Función Nativa : No permitida en Browser');
    });

    //copy array colors
    this.inmersionColors = Array.from(this.baseColors)
    this.interesColors = Array.from(this.baseColors)

    this.proveedor.obtenerValoraciones(this.profileId).subscribe((d) => {
      this.valoracion = this.filterValoraciones(d[0].valoraciones)
      console.log(this.valoracion)
      if (Object.keys(this.valoracion).length > 0){
        this.setPreviousVal()
        this.enviarTexto = 'Re-Valorar'
      }

    });
  }


  //Retorna el objeto que posee las valoraciones del usuario actual
  filterValoraciones(arrayValoraciones){
    let val = arrayValoraciones.filter( obj => obj.usuario_id === this.usuarioId)
    val.length > 0 
      ? val =  val[0] 
      : val = []
    return val
  }

  setPreviousVal(){
    this.valoracionInmersion = this.valoracion.val_inmersion
    this.valoracionInteres   = this.valoracion.val_interes

    this.cambiaColor("inmersion", this.valoracionInmersion - 1)
    this.cambiaColor("interes", this.valoracionInteres - 1)
    
  }




  //Obtiene la valoracion para interes e inmersion
  getVal(tipo:string,index:number){
    if (tipo === 'inmersion'){
      this.valoracionInmersion = index + 1
    } else {
      this.valoracionInteres = index + 1
    }
    this.cambiaColor(tipo,index)

  }

  //Cambia el color del boton pulsado y reestablece los demas
  cambiaColor(tipo:string,index:number){
    if (tipo === 'inmersion'){
      this.inmersionColors = Array.from(this.baseColors)
      this.inmersionColors[index] = 'dark'
    } else{
      this.interesColors = Array.from(this.baseColors)
      this.interesColors[index] = 'dark'
    }
  }

  enviarVal(){
    Object.keys(this.valoracion).length > 0
      ? this.actualizarVal()
      : this.agregarVal()  
  }

  actualizarVal(){
    const objValoracion = this.generarObjetoVal();
    this.proveedor.putValoraciones(this.profileId,objValoracion)
        .subscribe((result) =>{
          result === true 
            ? this.presentToast(
              'Valoración actualizada exitosamente',
              'checkmark-circle'
              )
            : this.presentToast(
              'Error al actualizar valoración',
              'close-circle'
              )})
  }

  agregarVal(){
    if (this.valoracionInmersion && this.valoracionInteres){
      const objValoracion = this.generarObjetoVal();
      this.proveedor.postValoraciones(this.profileId, objValoracion)
        .subscribe(success =>{
          this.presentToast(
            'Valoración agregada exitosamente',
            'checkmark-circle'
          )
          
          //Actualiza el objeto valoracion tras agregar una nueva valoracion
          this.proveedor.obtenerValoraciones(this.profileId).subscribe((d) => {
            this.valoracion = this.filterValoraciones(d[0].valoraciones)
            this.enviarTexto = 'Re-Valorar'
            });
          
        }, 
        error =>{
          this.presentToast(
            'Error al agregar valoración',
            'close-circle'
          )})

    } else{
      this.presentToast(
        'Debes seleccionar las opciones disponibles antes de enviar',
        'close-circle'
        )
    }

  }


  generarObjetoVal(){
    return {
      usuario_id: this.usuarioId,
      val_interes: this.valoracionInteres,
      val_inmersion: this.valoracionInmersion,
      fecha_val: this.crearFecha()
    }
  }

  //Genera la fecha actual en formato DD-MM-YYYY
  crearFecha(){
    const date = new Date();
    return [
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear()
    ].join('-');

  }


  //Toast confirmación
  async presentToast(mensaje,icono) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      icon: 'checkmark-circle'
    });

    await toast.present();
  }




}
