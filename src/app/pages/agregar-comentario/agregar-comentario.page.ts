import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ObjectID } from 'bson';

@Component({
  selector: 'app-agregar-comentario',
  templateUrl: './agregar-comentario.page.html',
  styleUrls: ['./agregar-comentario.page.scss'],
})
export class AgregarComentarioPage implements OnInit {

  refComentarios: string;
  profileId: string;
  comentario: FormGroup;
  userId:string = "632a072930305800b2d85220";

  constructor(
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
        Validators.minLength(2),
        Validators.maxLength(25)
      ]),
      contenido: new FormControl('', [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(200) ])
    })  
  }

  onSubmit(){
    if (this.comentario.valid){
      let objComentario = {
        ...this.comentario.value,
        usuario_id: this.userId,
        comentario_id: new ObjectID().toString(),
        fecha_subida: this.crearFecha(),
        likes: [],
        aceptado: true
      }

      console.log("Formulario correcto")
      console.log(objComentario)

      this.proveedor.postComentario(this.profileId,objComentario)
        .subscribe((data) =>{
          console.log(data)
        })

    } 
    else{
      console.log("Formulario incorrecto")
      
    }

  }


  crearFecha(){
    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    const newDate = [day, month, year].join('-');

    return newDate
  }

  

}
