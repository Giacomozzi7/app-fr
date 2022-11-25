import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Galeria } from 'src/app/interfaces/interfaces';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
})
export class GaleriaPage implements OnInit {
  profileId: string;
  refMemoria:string;
  galeria : Galeria[];
  refAgregarImagen: string;
  myImgStr: string = 'Mis Imágenes';
  myImg : boolean = false;
  userId = "632a072930305800b2d85221"
  refEditarImagen: string;

  misImgs: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public proveedor: ProveedorService,
  ) { }

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.refMemoria = 'memoria/'+ this.profileId;
    this.refAgregarImagen = 'agregar-imagen/' + this.profileId + '/agregar/""'
    this.refEditarImagen = 'editar-imagen/' + this.profileId + '/editar/""'
    
    this.obtGaleria()
    
  }

  obtGaleria(){
    this.proveedor.obtenerGaleria(this.profileId)
      .subscribe((data) => {
        this.galeria = data[0].galeria;
        this.buscarUsuarios()
      });

  }


  toggleImagenes(){
    if (this.myImg === false){
      this.galeria = this.galeria.filter(obj => obj.usuario_id === this.userId)
      this.myImg = true;
      this.myImgStr = 'Todos';
      this.misImgs = false;
    } else{
      this.obtGaleria()
      this.myImg = false;
      this.myImgStr = 'Mis Imágenes'
      this.misImgs = true;
    }
  }

  buscarUsuarios(){
    for (let i = 0; i < this.galeria.length; i++) {
      let userId = this.galeria[i]['usuario_id']
      this.proveedor.obtenerUsuario(userId)
        .subscribe((usuario) => {
          let strNombre = usuario[0]['nombre'] + " "+ usuario[0]['apellido']
          this.galeria[i]['usuario_name'] = strNombre
        })
   }

  }



}
