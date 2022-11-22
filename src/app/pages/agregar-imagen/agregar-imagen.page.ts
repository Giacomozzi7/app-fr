import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-imagen',
  templateUrl: './agregar-imagen.page.html',
  styleUrls: ['./agregar-imagen.page.scss'],
})
export class AgregarImagenPage implements OnInit {
  refGaleria: string;
  profileId: string;
  accion: string;
  imagen;
  fileToUpload!: Blob;
  userId: string = '632a072930305800b2d85221';

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.accion = this.activatedRoute.snapshot.paramMap.get('type');
    this.refGaleria = 'galeria/' + this.profileId;

    this.createFormGroup()
  }

  changeFile(evt: any){
    this.fileToUpload = evt.target.files[0]
  }

  onSubmit(){
    // Agregar validaciones

    //
    const fd = new FormData();
    fd.append('archivo', this.fileToUpload);
    fd.append('tipo','img');
    fd.append('usuario_id', this.userId)
    fd.append('descripcion', this.imagen.get('descripcion').value)
    fd.append('fecha_subida', this.crearFecha())

    console.log(fd)
  }

  createFormGroup() {
    this.imagen = new FormGroup({
      file: this.fb.control(null),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  //Genera la fecha actual en formato DD-MM-YYYY
  crearFecha() {
    const date = new Date();
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('-');
  }

}
