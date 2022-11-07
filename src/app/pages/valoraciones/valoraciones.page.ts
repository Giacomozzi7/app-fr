import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ToastController } from '@ionic/angular';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

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
  valoracionInteres:   Number;
  valoracionInmersion: Number;
  changeBackground:    string;
  enviarTexto:         string = 'Valorar'
  evento;


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

    this.proveedor.obtenerRelatos(this.profileId).subscribe((data) => {
      this.evento = data[0];
    });
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
    this.enviarTexto = 'Re-Valorar'
  }


  //Toast confirmación
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Valoración enviada!',
      duration: 1500,
      icon: 'checkmark-circle'
    });

    await toast.present();
  }




}
