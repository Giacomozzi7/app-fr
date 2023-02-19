import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Slide } from 'src/app/interfaces/interfaces';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { SwiperComponent } from 'swiper/angular';


@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {


  slides: Slide[] = [
    {
      usuario_id: "632a072930305800b2d85220",
      slide_id: "632a072930305800b2d85729",
      titulo: "Título Slide 1",
      img: [
        "https://fastly.picsum.photos/id/279/500/300.jpg?hmac=_6846w-htgSiCDH1QffV20aS_1W87l-k9odbMEPApTk",
        "https://fastly.picsum.photos/id/562/500/300.jpg?hmac=lwDORx-7c-1EUOg1b0f1otzg1K4Y4gRNspVCf4IygNI",
        "https://fastly.picsum.photos/id/443/500/300.jpg?hmac=Ae58ySNNvAr0kHB7RcShLgMzXmc_URTbCzko9RMyfoA"
      ],
      fechas: [
        "02/02/2001",
        "02/02/2010",
        "02/02/2020"
      ],
      descripciones: [
        "Momentos previos al suceso",
        "Esta es una descripcion para la imágen del justo después.",
        "Esta es una descripción para la imágen del ahora."
      ],
      likes: ["632a072930305800b2d85221",
        "632a072930305800b2d85222"
      ],
      fecha_subida: "01/01/2022",
      aceptado: true
    },
    {
      usuario_id: "632a072930305800b2d85221",
      slide_id: "632a072930305800b2d85929",
      titulo: "Título Slide 2",
      img: [
        "https://fastly.picsum.photos/id/919/500/300.jpg?hmac=CVpaDYlBeSJDeF3lUOYhhjAgwM_UkVuTLup2uSuytB8",
        "https://fastly.picsum.photos/id/649/500/300.jpg?hmac=-hbqVkLxhxidP4Wc3sjKAtuJO16oshnYAZtYwA9QLbk",
        "https://fastly.picsum.photos/id/827/500/300.jpg?hmac=56akje7HYnyUoBQVJOAYEaMLwuDZfqcdfQZevQf2Ok0"
      ],
      fechas: [
        "02/02/2001",
        "02/02/2010",
        "02/02/2020"
      ],
      descripciones: [
        "Esta es una descripcion para la imágen del antes.",
        "Esta es una descripcion para la imágen del justo después.",
        "Esta es una descripción para la imágen del ahora."
      ],
      likes: ["632a072930305800b2d85221",
        "632a072930305800b2d85222"
      ],
      fecha_subida: "01/01/2022",
      aceptado: true
    },
    {
      usuario_id: "632a072930305800b2d85221",
      slide_id: "632a072930305800b2d85017",
      titulo: "Título Slide 3",
      img: [
        "https://fastly.picsum.photos/id/13/500/300.jpg?hmac=wOBu-PTe-XaqcP3dewVwSDf_lr2eFWzePY5VvVYpaKE",
        "https://fastly.picsum.photos/id/907/500/300.jpg?hmac=uNG5zJY0yTrKjJRoBpOzE_ElYIVn7ci2DZ4PV6JjYts",
        "https://fastly.picsum.photos/id/607/500/300.jpg?hmac=bgG3fiPmN_nXIjiVDnpbVXR1ODefxggmLDAYVEcX9ys"
      ],
      fechas: [
        "02/02/2001",
        "02/02/2010",
        "02/02/2020"
      ],
      descripciones: [
        "Esta es una descripcion para la imágen del antes.",
        "Esta es una descripcion para la imágen del justo después.",
        "Esta es una descripción para la imágen del ahora."
      ],
      likes: ["632a072930305800b2d85221",
      "632a072930305800b2d85222"
      ],
      fecha_subida: "01/01/2022",
      aceptado: true
    },
    {
      usuario_id: "632a072930305800b2d85221",
      slide_id: "632a072930305800b2d85027",
      titulo: "Título Slide 4",
      img: [
        "https://fastly.picsum.photos/id/358/500/300.jpg?hmac=RogC8P-1BznDwjManDeiFlMHkMCctaIcs3cxH7RTivA",
        "https://fastly.picsum.photos/id/478/500/300.jpg?hmac=EyHZUYE4Ovop7om5M539gFVlS0hQUP_wN2sBPIfjhTw",
        "https://fastly.picsum.photos/id/572/500/300.jpg?hmac=5iom2Ph4IrDmqbN2DG_GhQiksGDu0RpmCmbOaRgjMD4"
      ],
      fechas: [
        "02/02/2001",
        "02/02/2010",
        "02/02/2020"
      ],
      descripciones: [
        "Esta es una descripcion para la imágen del antes.",
        "Esta es una descripcion para la imágen del justo después.",
        "Esta es una descripción para la imágen del ahora."
      ],
      likes: [ "632a072930305800b2d85221",
               "632a072930305800b2d85222"
      ],
      fecha_subida: "01/01/2022",
      aceptado: true
    },
    {
      usuario_id: "632a072930305800b2d85221",
      slide_id: "632a072930305800b2d85037",
      titulo: "Título Slide 5",
      img: [
        "https://fastly.picsum.photos/id/908/500/300.jpg?hmac=6Gpoe1X4roc71PzB6Qc8_PEstmnXE35WODhZizi3K4I",
        "https://fastly.picsum.photos/id/1063/500/300.jpg?hmac=pniJxBYuT2PxjdkbVOGrPXqX3xJrxyuDffOZFRaSecA",
        "https://fastly.picsum.photos/id/733/500/300.jpg?hmac=hnsZUNrNCxOXrH_nRtJv43hiJ7RM8Sd79deddDkpmuA"
      ],
      fechas: [
        "02/02/2001",
        "02/02/2010",
        "02/02/2020"
      ],
      descripciones: [
        "Esta es una descripcion para la imágen del antes.",
        "Esta es una descripcion para la imágen del justo después.",
        "Esta es una descripción para la imágen del ahora."
      ],
      likes: [ "632a072930305800b2d85221",
       "632a072930305800b2d85222"
      ],
      fecha_subida: "01/01/2022",
      aceptado: true
    },
    {
      usuario_id: "632a072930305800b2d85220",
      slide_id: "63755274415d119042c31e56",
      titulo: "Título Slide 6",
      img: [
        "https://fastly.picsum.photos/id/827/500/300.jpg?hmac=56akje7HYnyUoBQVJOAYEaMLwuDZfqcdfQZevQf2Ok0",
        "https://fastly.picsum.photos/id/781/500/300.jpg?hmac=SlEwLsORqoCFnl_hXtAAkZq8-n5yB3wyf0o8ysi3IRk",
        "https://fastly.picsum.photos/id/270/500/300.jpg?hmac=ZEyOBUlsxbPgv_ioRFGqPDZtIaS0GLrqHDG5pMny4Gg"
      ],
      fechas: [
        "02/02/2001",
        "02/02/2010",
        "02/02/2020"
      ],
      descripciones: [
        "Esta es una descripcion para la imágen del antes.",
        "Esta es una descripcion para la imágen del justo después.",
        "Esta es una descripción para la imágen del ahora."
      ],
      likes: [ "632a072930305800b2d85221",
      "632a072930305800b2d85222"
      ],
      fecha_subida: "01/01/2022",
      aceptado: true
    },
  ]

  profileId: string;
  refMemoria: string;
  userId: string = '632a072930305800b2d85221';
  labels: string[] = ['Antes','Durante','J. Después','Ahora']
  labels_2: string[] = ['Antes','J. Después','Ahora']

  aColor: String[][] = [];

  @ViewChildren('mySwiper') components: QueryList<SwiperComponent>;

  strMisSlides: string = 'Mis Slides';
  strAgregar: string = 'Agregar Slides'
  mySld: boolean = false;
  misSlds: boolean = false;
  flagSlides:  boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    public proveedor: ProveedorService,
    private alertController: AlertController
  ) { }


  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.refMemoria = 'memoria/' + this.profileId;
    this.obtSlides()

  }

  obtSlides(){
    this.buscarUsuarios()
    this.fillLikes()
    this.genButtonColors()
    console.log(this.aColor)

  }

  //Genera los colores para todo el conjunto de botones
  genButtonColors() {
    this.aColor = [];
    for (let i = 0; i < this.slides.length; i++) {
      if (this.slides[i].img.length === 3){
        this.aColor.push(['dark', 'tertiary', 'tertiary']);
      } else {
        this.aColor.push(['dark','tertiary','tertiary','tertiary'])
      }
    }
  }

  clickBtn(ind_slide: number, ind_btn: number) {
    let aData = this.components.toArray();
    if (this.slides[ind_slide].img.length === 3){
      this.aColor[ind_slide] = ['tertiary', 'tertiary', 'tertiary'];
    } else {
      this.aColor[ind_slide] = ['tertiary', 'tertiary', 'tertiary','tertiary'];
    }

    this.aColor[ind_slide][ind_btn] = 'dark';

    console.log(aData)

    aData[ind_slide].swiperRef.slideTo(ind_btn)


  }

  buscarUsuarios() {
    for (let i = 0; i < this.slides.length; i++) {
      let userId = this.slides[i]['usuario_id'];
      this.proveedor.obtenerUsuario(userId).subscribe((usuario) => {
        let strNombre = usuario[0]['nombre'] + ' ' + usuario[0]['apellido'];
        this.slides[i]['usuario_name'] = strNombre;
      });
    }
  }

  fillLikes() {
    this.slides = this.slides.map((element: Slide) => {
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

  toggleSlides() {
    if (this.mySld === false) {
      this.slides = this.slides.filter(
        (obj) => obj.usuario_id === this.userId
      );
      this.mySld = true;
      this.strMisSlides = 'Todos';
      this.misSlds = true;
    } else {
      this.obtSlides();
      this.mySld = false;
      this.strMisSlides = 'Mis Slides'
      this.misSlds = false;
    }
  }






}
