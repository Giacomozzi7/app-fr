import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comentarios } from 'src/app/interfaces/interfaces';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
  profileId: string;
  refMemoria:string;
  comentarios: Comentarios [] = [
    {
      "titulo": "Un lugar para perderse...",
      "contenido": "En este apartado el usuario describe su experiencia o impresiones que ha tenido al visitar el punto de interés. Puede incluir recomendaciones para otros usuarios e incluso escribir un relato de una vivencia propia en el pasado.",
      "fecha_subida": "01/01/2022",
      "likes": ["632a072930305800b2d85221","632a072930305800b2d85222","632a072930305800b2d85220"],
      "comentario_id": "632a072930305800b2d85251",
      "usuario_id": "632a072930305800b2d85222",
      "aceptado": true
    },
    {
      "titulo": "Un lugar muy Interesante",
      "contenido": "En este apartado el usuario describe su experiencia o impresiones que ha tenido al visitar el punto de interés. Puede incluir recomendaciones para otros usuarios e incluso escribir un relato de una vivencia propia en el pasado.",
      "fecha_subida": "01/01/2022",
      "likes": ["632a072930305800b2d85222","632a072930305800b2d85220"],
      "comentario_id": "632a072930305800b2d85231",
      "usuario_id": "632a072930305800b2d85221",
      "aceptado": true
    },
    {
      "titulo": "Novedoso",
      "contenido": "En este apartado el usuario describe su experiencia o impresiones que ha tenido al visitar el punto de interés. Puede incluir recomendaciones para otros usuarios e incluso escribir un relato de una vivencia propia en el pasado.",
      "fecha_subida": "01/01/2022",
      "likes": ["632a072930305800b2d85220"],
      "comentario_id": "636cfac64fea906e1d8992ff",
      "usuario_id": "632a072930305800b2d85220",
      "aceptado": true
    },
    {
      "titulo": "Interesante",
      "contenido": "En este apartado el usuario describe su experiencia o impresiones que ha tenido al visitar el punto de interés. Puede incluir recomendaciones para otros usuarios e incluso escribir un relato de una vivencia propia en el pasado.",
      "fecha_subida": "01/01/2022",
      "likes": ["632a072930305800b2d85221","632a072930305800b2d85222","632a072930305800b2d85220"],
      "comentario_id": "636d5e013412a4716df1f22c",
      "usuario_id": "632a072930305800b2d85220",
      "aceptado": true
    }
  ] 

  

  constructor(
    private activatedRoute: ActivatedRoute,
    public proveedor: ProveedorService,
  ) { }

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.refMemoria = 'memoria/'+ this.profileId;
    this.buscarUsuarios();

  }

  buscarUsuarios(){
    for (let i = 0; i < this.comentarios.length; i++) {
      let userId = this.comentarios[i]['usuario_id']
      this.proveedor.obtenerUsuario(userId)
        .subscribe((usuario) => {
          let strNombre = usuario[0]['nombre'] + " "+ usuario[0]['apellido']
          this.comentarios[i]['usuario_id'] = strNombre
        })
   }

  }

}
