import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  ToastController,
  AlertController,
  NavController,
} from '@ionic/angular';

@Component({
  selector: 'app-agregar-comentario',
  templateUrl: './agregar-comentario.page.html',
  styleUrls: ['./agregar-comentario.page.scss'],
})
export class AgregarComentarioPage implements OnInit {
  refComentarios: string;
  profileId: string;
  accion: string;
  comentario: FormGroup;
  myComentario;
  idCom;
  userId: string = '632a072930305800b2d85221';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public proveedor: ProveedorService
  ) {}

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.accion = this.activatedRoute.snapshot.paramMap.get('type');
    this.idCom = this.activatedRoute.snapshot.paramMap.get('id_com');
    this.refComentarios = 'comentarios/' + this.profileId;

    if (this.accion === 'editar') {
      this.findMyComment()
    }

    this.createFormGroup()

  }

  createFormGroup() {
    this.comentario = new FormGroup({
      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      contenido: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  findMyComment() {
      this.proveedor.obtenerComentarios(this.profileId).subscribe((data) => {
        this.myComentario = data[0].comentarios.filter((com) => {
          return (
            com.usuario_id === this.userId && com.comentario_id === this.idCom
          );
        })[0];

        this.comentario.patchValue(this.myComentario)

    });
  }

  onSubmit() {
    if (this.comentario.valid) {
      let objComentario = {
        ...this.comentario.value,
        usuario_id: this.userId,
        fecha_subida: this.crearFecha(),
        aceptado: true,
      };

      if (this.accion === 'editar') {
        objComentario = {
          ...objComentario,
          comentario_id: this.myComentario.comentario_id,
        };

        this.proveedor
          .updateComentario(this.profileId, objComentario)
          .subscribe((data) => {
            this.present('Editado','El comentario ha sido editado exitosamente');
          });
      } else {
        this.proveedor
          .postComentario(this.profileId, objComentario)
          .subscribe((data) => {
            this.present('Agregado','El comentario ha sido agregado exitosamente');
          });
      }
    } else {
      this.presentToast();
    }
  }

  //Genera la fecha actual en formato DD-MM-YYYY
  crearFecha() {
    const date = new Date();
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('-');
  }

  //Toast confirmación
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Todos los campos deben ser llenados',
      duration: 1500,
      icon: 'close-circle',
    });

    await toast.present();
  }

  async present(h:string,sh:string) {
    const alert = await this.alertController.create({
      header: h,
      subHeader: sh,
      backdropDismiss: false,
      buttons: [
        ,
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/comentarios/' + this.profileId]);
          },
        },
      ],
    });

    await alert.present();
  }
}
