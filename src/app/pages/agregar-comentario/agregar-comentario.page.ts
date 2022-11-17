import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-comentario',
  templateUrl: './agregar-comentario.page.html',
  styleUrls: ['./agregar-comentario.page.scss'],
})
export class AgregarComentarioPage implements OnInit {

  refComentarios: string;
  profileId: string;
  comentario: FormGroup;
  userId:string = "632a072930305800b2d85221";

  constructor(
    private router: Router,
    private alertController:  AlertController,
    private toastController: ToastController,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public proveedor: ProveedorService,
  ) {}

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.refComentarios = 'comentarios/'+ this.profileId;

    this.comentario = new FormGroup({
      titulo: new FormControl('',[
        Validators.required,
        Validators.minLength(2)
      ]),
      contenido: new FormControl('', [
        Validators.required, 
        Validators.minLength(2) ])
    })  
  }

  onSubmit(){
    if (this.comentario.valid){
      let objComentario = {
        ...this.comentario.value,
        usuario_id: this.userId,
        fecha_subida: this.crearFecha(),
        aceptado: true
      }

      this.proveedor.postComentario(this.profileId,objComentario)
        .subscribe((data) =>{
          this.presentAgregar()
        })

    } 
    else{
      this.presentToast();
      
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
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Todos los campos deben ser llenados',
      duration: 1500,
      icon: 'close-circle'
    });

    await toast.present();
  }

  async presentAgregar() {
    const alert = await this.alertController.create({
      header: 'Agregado!',
      subHeader: 'Comentario agregado exitosamente',
      backdropDismiss: false,
      buttons: [,
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/comentarios/'+this.profileId])
          },
        },
      ],
    });

    await alert.present();
  }

  

}
