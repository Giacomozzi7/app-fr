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
  relato
  accion: string;
  fileToUpload!: Blob;
  relatoSrc: String | ArrayBuffer;
  userId: string = '632a072930305800b2d85221';
  isAudio!: boolean;
  idRel: string
  myRelato
  conte: string;



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
    this.idRel = this.activatedRoute.snapshot.paramMap.get('id_rel');
    this.refRelatos = 'relatos/' + this.profileId;

    if(this.accion === 'editar'){
      this.findMyRelato();
    }

    this.createFormGroup()
  }

  createFormGroup(): void {
    this.relato = new FormGroup({
      Archivo: this.fb.control(null),
      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  findMyRelato(){
    this.proveedor.obtenerRelatos(this.profileId).subscribe((data) => {
      console.log(data)
      this.myRelato = data[0].relatos.filter((rel) => {
        return(
          rel.usuario_id === this.userId && rel.relato_id === this.idRel
        );
      })[0];

      this.conte = this.myRelato.contenido
      console.log(this.conte)
      this.relato.patchValue(this.myRelato);
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
      console.log(this.relatoSrc)
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
    console.log(this.relato)
    if (this.isAudio === true && this.relato.valid) {
      const fd = this.createFormData();

      console.log(this.accion)
      if(this.accion === 'editar'){

        this.proveedor.putRelato(this.profileId, fd)
        .subscribe((data) => {
          this.mostrarAlert('Editado', 'Se ha editado el relato exitosamente');
        });

      }
      else{

      this.proveedor.postRelato(this.profileId,fd)
        .subscribe( (success) =>{
          this.mostrarAlert('Agregado','El relato ha sido agregado exitosamente')
        })
      }

    } else {
      !this.isAudio &&
        this.mostrarToast('Es necesario subir un archivo de audio válido');

      !this.relato.valid &&
        this.mostrarToast('Todos los campos deben ser llenados');
    }
  }

  createFormData(): FormData {
    const fd = new FormData();

    if(this.accion === 'editar'){
      fd.append('relato_id', this.idRel);
      fd.append('titulo', this.relato.get('titulo').value);
      fd.append('contenido', this.conte);
      fd.append('archivo', this.fileToUpload);
      fd.append('fecha_subida', this.crearFecha());

      return fd;
    }
    else{
    fd.append('archivo', this.fileToUpload);
    fd.append('usuario_id', this.userId);
    fd.append('titulo', this.relato.get('titulo').value);
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
            this.router.navigate(['/relatos/' + this.profileId]);
          },
        },
      ],
    });

    await alert.present();
  }

}
