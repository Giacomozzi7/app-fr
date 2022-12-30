import { Component, OnInit, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { IonRow, IonSlides, NavController } from '@ionic/angular';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
//PErmite sacar informacion de la url
import { ActivatedRoute } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Destacado } from 'src/app/interfaces/interfaces';

// import Swiper core and required modules
import SwiperCore, { EffectCreative, Autoplay, Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([EffectCreative, Autoplay, Pagination]);

@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.page.html',
  styleUrls: ['./memoria.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MemoriaPage implements OnInit {
  profileId: string;
  evento;
  refGaleria: string;
  refRelatos: string;
  refComentarios: string;
  refValoraciones: string;
  refSlides: string;
  aColor: String[][] = [];
  aDestacados: Destacado[]


  @ViewChildren('mySlider') components: QueryList<IonSlides>;

  constructor(
    private activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public proveedor: ProveedorService,
    private screenOrientation: ScreenOrientation,
  ) {}

  ngOnInit() {
    this.screenOrientation.unlock();
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.refGaleria = 'galeria/'+ this.profileId;
    this.refRelatos = 'relatos/'+ this.profileId;
    this.refValoraciones = 'valoraciones/'+ this.profileId;
    this.refComentarios = 'comentarios/' + this.profileId;
    this.refSlides = 'slides/'+ this.profileId;
    this.screenOrientation.lock('portrait').catch((error) => {
      console.log('Función Nativa : No permitida en Browser');
    });

    this.proveedor.obtenerEvento(this.profileId)
      .subscribe((data) => {
        this.evento = data[0];
        console.log(this.evento)
        this.obtDestacados()
        

      });
  }

  obtDestacados(){
    this.proveedor.obtenerDestacados()
      .subscribe((data: Destacado[]) => {
        this.aDestacados = data
        this.buscarUsuarios()
      })
  }

  //Bloquea los slides para que solo sean controlables por botones
  lockSlides() {
    //this.component asincrono
    this.components.changes.subscribe((aSL) => {
      let arraySlides = aSL.toArray();
      arraySlides.forEach((slide) => {
        slide.lockSwipes(true);
      });
    });
  }

  buscarUsuarios() {
    this.aDestacados.forEach((destacado: Destacado , idx: number) => {
      this.proveedor.obtenerUsuario(destacado['id_usuario'])
        .subscribe((usuario) => {
          this.aDestacados[idx]['usuario_name'] = usuario[0]['nombre'] + ' ' + usuario[0]['apellido'];
      });
    })
  }




  

}
