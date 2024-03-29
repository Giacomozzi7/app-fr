import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Galeria } from 'src/app/interfaces/interfaces';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
})
export class GaleriaPage implements OnInit {
  profileId: string;
  refMemoria: string;
  galeria: Galeria[];
  refAgregar: string;
  refEditar: string;
  
  myImg: boolean = false;
  userId: string = '632a072930305800b2d85221';
  
  misImgs: boolean = false;
  flagGaleria:  boolean = true;

  //Segment changes
  strMiGaleria: string = 'Mis Imágenes';
  strAgregar: string = 'Agregar Imágen'
  strParagraph: string = 'todas las imágenes subidas'
  strIcon: string = 'images'


  constructor(
    private activatedRoute: ActivatedRoute,
    public proveedor: ProveedorService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.refMemoria = 'memoria/' + this.profileId;
    this.refAgregar = 'agregar-imagen/' + this.profileId + '/agregar/""';
    this.refEditar = 'agregar-imagen/' + this.profileId + '/editar/';
    

    this.obtGaleria();
    
  }

  fillLikes() {
    this.galeria = this.galeria.map((element: Galeria) => {
      if (element.likes.includes(this.userId)) {
        return {
          ...element,
          like_name: 'heart',
        };
      } else {
        return {
          ...element,
          like_name: 'heart-outline',
        };
      }
    });
  }

  obtGaleria() {
    this.proveedor.obtenerGaleria(this.profileId).subscribe((data) => {
      this.galeria = data[0].galeria;
      console.log(this.galeria)
      this.buscarUsuarios();
      this.fillLikes();
    });
  }

  eliminarGaleria(categoria: string, id:string, id_g:string){
    this.proveedor.deleteGaleria(categoria,id,id_g)
      .subscribe((success)=>{
        console.log(success)
        this.obtGaleria();
      })
  }

  toggleImagenes() {
    if (this.myImg === false) {
      this.galeria = this.galeria.filter(
        (obj) => obj.usuario_id === this.userId
      );
      this.myImg = true;
      this.strMiGaleria = 'Todos';
      this.misImgs = true;
    } else {
      this.obtGaleria();
      this.myImg = false;
      this.flagGaleria
        ? this.strMiGaleria = 'Mis Imágenes'
        : this.strMiGaleria = 'Mis Videos'

      this.misImgs = false;
    }
  }

  buscarUsuarios() {
    for (let i = 0; i < this.galeria.length; i++) {
      let userId = this.galeria[i]['usuario_id'];
      this.proveedor.obtenerUsuario(userId).subscribe((usuario) => {
        let strNombre = usuario[0]['nombre'] + ' ' + usuario[0]['apellido'];
        this.galeria[i]['usuario_name'] = strNombre;
      });
    }
  }

  async segmentChanged() {
    this.flagGaleria = await !this.flagGaleria
    if (this.flagGaleria){
      this.strMiGaleria = 'Mis Imágenes'
      this.strAgregar = 'Agregar Imágen'
      this.strParagraph = 'todas las imágenes subidas'
      this.strIcon = 'images'
      this.refAgregar = 'agregar-imagen/' + this.profileId + '/agregar/""';
      this.refEditar = 'agregar-imagen/' + this.profileId + '/editar/';
    } else{
      this.strMiGaleria = 'Mis Videos'
      this.strAgregar = 'Agregar Video'
      this.strParagraph = 'todos los videos'
      this.strIcon = 'videocam'
      this.refAgregar = 'agregar-video/' + this.profileId + '/agregar/""';
      this.refEditar = 'agregar-video/' + this.profileId + '/editar/';
    }

  }

  async presentEliminar(categoria: string, id: string,id_g:string) {
    const alert = await this.alertController.create({
      header: '¿Estás seguro que deseas eliminar el contenido?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
            this.eliminarGaleria(categoria,id,id_g)
          },
        },
      ],
    });

    await alert.present();
  }

}
