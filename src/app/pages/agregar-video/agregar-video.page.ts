import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-agregar-video',
  templateUrl: './agregar-video.page.html',
  styleUrls: ['./agregar-video.page.scss'],
})
export class AgregarVideoPage implements OnInit {
  refGaleria: string;
  profileId: string;
  accion: string;
  video: FormGroup;
  fileToUpload!: Blob;
  userId: string = '632a072930305800b2d85221';
  videoSrc: String | ArrayBuffer = 'a.mp4';
  isVid!: boolean;
  vidSelected: boolean
  myVid: FormData
  idGal

  constructor(
    private router: Router,
    private alertController: AlertController,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    public proveedor: ProveedorService
  ) { }

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.accion = this.activatedRoute.snapshot.paramMap.get('type');
    this.idGal = this.activatedRoute.snapshot.paramMap.get('id_vid');
    this.refGaleria = 'galeria/' + this.profileId;

    if(this.accion === 'editar'){
      this.findMyVideo();
    }

    this.createFormGroup();
  }

  createFormGroup(): void {
    this.video = new FormGroup({
      file: this.fb.control(null),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  changeFile(event: any): void {
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
      this.mostrarPrev(event);
      this.vidSelected = true;
    }
  }

  cleanForm(){
    this.video.reset();
    this.videoSrc = '';
    this.vidSelected = false;
  }

  findMyVideo(){
    this.proveedor.obtenerGaleria(this.profileId).subscribe((data) => {
      this.myVid = data[0].galeria.filter((img) => {
        return (
          img.usuario_id === this.userId && img.galeria_id === this.idGal
        );});[0];
      this.video.patchValue(this.myVid);
    });
  
  }

  mostrarPrev(event: any): void {
    this.isVid = this.validarFormato(event.target.files[0].name);
    if (this.isVid) {
      console.log('isvid')
      const reader = new FileReader();
      reader.onload = (e) => (this.videoSrc = reader.result);
      reader.readAsDataURL(this.fileToUpload);
      
    } else {
      this.videoSrc = '';
    }
  }

  validarFormato(fileName: string): boolean {
    const parts = fileName.split('.');
    const ext = parts[parts.length - 1];
    switch (ext.toLowerCase()) {
      case 'mp4':
      case 'wmv':
      case 'mov':
      case 'avi':
        return true;
    }
    return false;
  }

  onSubmit(): void {
    if (this.isVid === true && this.video.valid) {
      const fd = this.createFormData();

      if(this.accion === 'editar'){
        this.proveedor.putGaleria('video',this.profileId, fd).subscribe((data) => {
          this.mostrarAlert('Video editado', 'El video se editó correctamente');
        });
      }

      else{
      this.proveedor.postGaleria('video',this.profileId,fd)
        .subscribe( (success) =>{
          this.mostrarAlert('Agregado','El video ha sido agregada exitosamente')
        })

      }

    } else {
      !this.isVid &&
        this.mostrarToast('Es necesario subir un archivo de video válido');

      !this.video.valid &&
        this.mostrarToast('Todos los campos deben ser llenados');
    }
  }

  createFormData(): FormData {
    const fd = new FormData();

    if(this.accion === 'editar'){
      fd.append('usuario_id', this.userId);
      fd.append('tipo', 'vid');
      fd.append('galeria_id', this.idGal);
      fd.append('descripcion', this.video.get('descripcion').value);
      fd.append('fecha_subida', this.crearFecha());
      fd.append('archivo', this.fileToUpload);

      return fd;
    }

    else{
      fd.append('archivo', this.fileToUpload);
      fd.append('tipo', 'vid');
      fd.append('usuario_id', this.userId);
      fd.append('descripcion', this.video.get('descripcion').value);
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
