import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-agregar-imagen',
  templateUrl: './agregar-imagen.page.html',
  styleUrls: ['./agregar-imagen.page.scss'],
})
export class AgregarImagenPage implements OnInit {
  refGaleria: string;
  profileId: string;
  accion: string;
  imagen: FormGroup;
  fileToUpload!: Blob;
  userId: string = '632a072930305800b2d85221';
  imageSrc: String | ArrayBuffer;
  isImg!: boolean;
  imageSelected: boolean
  myImagen: FormData
  idGal
  descripcionImg: string =''


  constructor(
    private router: Router,
    private alertController: AlertController,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    public proveedor: ProveedorService
  ) {}

  ngOnInit(): void {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.accion = this.activatedRoute.snapshot.paramMap.get('type');
    this.idGal = this.activatedRoute.snapshot.paramMap.get('id_img');
    this.refGaleria = 'galeria/' + this.profileId;


    if(this.accion === 'editar'){
      this.findMyImagen();
    }

    this.createFormGroup();
  }


  createFormGroup(): void {
    this.imagen = new FormGroup({
      file: this.fb.control(null),
      descripcion: new FormControl(this.descripcionImg, [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  changeFile(event: any): void {
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
      this.mostrarPrev(event);
      this.imageSelected = true;
    }
  }

  cleanForm(){
    this.imagen.reset();
    this.imageSrc = '';
    this.imageSelected = false;
    this.descripcionImg = ''
  }

  findMyImagen(){
    this.proveedor.obtenerGaleria(this.profileId).subscribe((data) => {
      this.myImagen = data[0].galeria.filter((img) => {
        return (
          img.usuario_id === this.userId && img.galeria_id === this.idGal
        );
      });[0];
      console.log(this.myImagen)
      console.log(typeof(this.myImagen))
      this.imagen.patchValue(this.myImagen);
      this.imagen.patchValue({descripcion : this.myImagen[0].descripcion})
      this.descripcionImg = this.myImagen[0].descripcion
      

    });
  
  }

  mostrarPrev(event: any): void {
    this.isImg = this.validarFormato(event.target.files[0].name);
    if (this.isImg) {
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.fileToUpload);
      console.log(this.imageSrc)
    } else {
      this.imageSrc = '';
    }
  }

  validarFormato(fileName: string): boolean {
    const parts = fileName.split('.');
    const ext = parts[parts.length - 1];
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'gif':
      case 'bmp':
      case 'png':
        return true;
    }
    return false;
  }

  onSubmit(): void {
    if (this.isImg === true && this.imagen.valid) {
      const fd = this.createFormData();

      if(this.accion === 'editar'){
        this.proveedor.putGaleria('imagen',this.profileId, fd).subscribe((data) => {
          this.mostrarAlert('Imagen editada', 'La imagen se edito correctamente');
        });
      }

      else{
      this.proveedor.postGaleria('imagen',this.profileId,fd)
        .subscribe( (success) =>{
          this.mostrarAlert('Agregado','La imágen ha sido agregada exitosamente')
        })

      }

    } else {
      !this.isImg &&
        this.mostrarToast('Es necesario subir un archivo de imágen válido');

      !this.imagen.valid &&
        this.mostrarToast('Todos los campos deben ser llenados');
    }
  }

  createFormData(): FormData {
    const fd = new FormData();

    if(this.accion === 'editar'){
      fd.append('usuario_id', this.userId);
      fd.append('galeria_id', this.idGal);
      fd.append('descripcion', this.imagen.get('descripcion').value);
      fd.append('fecha_subida', this.crearFecha());
      fd.append('archivo', this.fileToUpload);

      return fd;
    }

    else{
      fd.append('archivo', this.fileToUpload);
      fd.append('tipo', 'img');
      fd.append('usuario_id', this.userId);
      fd.append('descripcion', this.imagen.get('descripcion').value);
      fd.append('fecha_subida', this.crearFecha());

      return fd;
    }
  }

  //Genera la fecha actual en formato DD-MM-YYYY
  crearFecha(): string {
    const date = new Date();
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('-');
  }

  //Toast validacion
  async mostrarToast(msg: string): Promise<void> {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      icon: 'close-circle',
    });

    await toast.present();
  }

  async mostrarAlert(h: string, sh: string) : Promise<void>{
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
            this.router.navigate(['/galeria/' + this.profileId]);
          },
        },
      ],
    });

    await alert.present();
  }
}
