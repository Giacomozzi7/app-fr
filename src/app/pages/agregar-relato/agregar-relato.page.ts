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
      titulo: new FormControl('asd', [
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
    console.log('hola')
  }

}
