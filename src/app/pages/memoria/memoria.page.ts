import { Component, OnInit, ViewChildren, QueryList, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { IonRow, IonSlides, NavController } from '@ionic/angular';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
//PErmite sacar informacion de la url
import { ActivatedRoute } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Destacado } from 'src/app/interfaces/interfaces';


// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { SwiperComponent } from "swiper/angular";

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.page.html',
  styleUrls: ['./memoria.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MemoriaPage implements OnInit{
  profileId: string;
  evento;
  refGaleria: string;
  refRelatos: string;
  refComentarios: string;
  refValoraciones: string;
  refSlides: string;
  aColor: String[][] = [];
  aDestacados: Destacado[]

  @ViewChild('swiperComponent') swiperComponent: SwiperComponent;

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
        this.swiperComponent.swiperRef.autoplay.start()
      })
  }

  buscarUsuarios() {
    this.aDestacados.forEach((destacado: Destacado , idx: number) => {
      this.proveedor.obtenerUsuario(destacado['id_usuario'])
        .subscribe((usuario) => {
          this.aDestacados[idx]['usuario_name'] = usuario[0]['nombre'] + ' ' + usuario[0]['apellido'];
      });
    })
  }

  slideTo(num: number){
    num === -1
      ? this.swiperComponent.swiperRef.slidePrev()
      : this.swiperComponent.swiperRef.slideNext()
    
    this.swiperComponent.swiperRef.autoplay.start()
  }






  

}
