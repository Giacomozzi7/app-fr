import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/interfaces/interfaces';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
  profileId: string;
  refMemoria:string;
  refAgregarComentario: string;
  refEditarComentario: string;
  comentarios: Comentario[];
  userId = "632a072930305800b2d85221"
  myCom: boolean = false;
  myComStr: string = 'Mis Comentarios';
  misComentarios: boolean = false
  

  constructor(
    private activatedRoute: ActivatedRoute,
    public proveedor: ProveedorService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.refMemoria = 'memoria/'+ this.profileId;
    this.refAgregarComentario = 'agregar-comentario/' + this.profileId + '/agregar/""'
    this.refEditarComentario = 'agregar-comentario/' + this.profileId + '/editar/'
    this.obtComentarios()
    

  }

  fillLikes(){
    this.comentarios = this.comentarios.map((element: Comentario) =>{
      if (element.likes.includes(this.userId)){
        return {
          ...element,
          like_name: 'heart'
        }
      } 
      else {
        return {
          ...element,
          like_name: 'heart-outline'
        }
      }
    })
  }

  obtComentarios(){
    this.proveedor.obtenerComentarios(this.profileId)
      .subscribe((data) =>{
        this.comentarios = data[0].comentarios;
        this.buscarUsuarios()
        this.fillLikes()
      })
  }

  buscarUsuarios(){
    for (let i = 0; i < this.comentarios.length; i++) {
      let userId = this.comentarios[i]['usuario_id']
      this.proveedor.obtenerUsuario(userId)
        .subscribe((usuario) => {
          let strNombre = usuario[0]['nombre'] + " "+ usuario[0]['apellido']
          this.comentarios[i]['usuario_name'] = strNombre
        })
   }

  }

  eliminarComentario(id:string, id_c:string){
    console.log(id)
    this.proveedor.deleteComentario(id,id_c)
      .subscribe((success)=>{
        console.log(success)
        this.obtComentarios();
      })
  }

  toggleComentarios(){
    if (this.myCom === false){
      this.comentarios = this.comentarios.filter(obj => obj.usuario_id === this.userId)
      this.myCom = true;
      this.myComStr = 'Todos';
      this.misComentarios = true
    } else{
      this.obtComentarios()
      this.myCom = false;
      this.myComStr = 'Mis Comentarios'
      this.misComentarios = false
    }
  }


  async presentEliminar(id: string,id_c:string) {
    console.log(id)
    const alert = await this.alertController.create({
      header: '¿Estás seguro que deseas eliminar el comentario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
            this.eliminarComentario(id,id_c)
          },
        },
      ],
    });

    await alert.present();
  }

}
