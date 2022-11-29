import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-agregar-relato',
  templateUrl: './agregar-relato.page.html',
  styleUrls: ['./agregar-relato.page.scss'],
})
export class AgregarRelatoPage implements OnInit {
  refRelatos: string;
  profileId: string;
  relato;
  accion: string;
  fileToUpload!: Blob;
  relatoSrc: String | ArrayBuffer;
  userId: string = '632a072930305800b2d85221';
  isAudio!: boolean;

  @ViewChild('figAudio') figAudio: ElementRef;

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
    this.refRelatos = 'relatos/' + this.profileId;

    this.createFormGroup()
  }

  createFormGroup(): void {
    this.relato = new FormGroup({
      file: this.fb.control(null),
      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  changeFile(event: any): void {
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
      this.mostrarPrev(event)

    }
  }

  mostrarPrev(event: any): void {
    this.isAudio = this.validarFormato(event.target.files[0].name);
    if (this.isAudio) {
      this.relatoSrc = URL.createObjectURL(event.target.files[0])
      this.figAudio.nativeElement.src = this.relatoSrc
    } else {
      this.relatoSrc = '';
    }
  }

  validarFormato(fileName: string): boolean {
    const parts = fileName.split('.');
    const ext = parts[parts.length - 1];
    switch (ext.toLowerCase()) {
      case 'mp3':
      case 'wav':
      case 'ogg':
        return true;
    }
    return false;
  }

  onSubmit():void{
    if (this.isAudio === true && this.relato.valid) {
      const fd = this.createFormData();

      this.proveedor.postRelato(this.profileId,fd)
        .subscribe( (success) =>{
          this.mostrarAlert('Agregado','El relato ha sido agregado exitosamente')
        })

    } else {
      !this.isAudio &&
        this.mostrarToast('Es necesario subir un archivo de audio válido');

      !this.relato.valid &&
        this.mostrarToast('Todos los campos deben ser llenados');
    }
  }

  createFormData(): FormData {
    const fd = new FormData();
    fd.append('archivo', this.fileToUpload);
    fd.append('usuario_id', this.userId);
    fd.append('titulo', this.relato.get('titulo').value);
    fd.append('fecha_subida', this.crearFecha());
    return fd;
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
            this.router.navigate(['/relatos/' + this.profileId]);
          },
        },
      ],
    });

    await alert.present();
  }

}