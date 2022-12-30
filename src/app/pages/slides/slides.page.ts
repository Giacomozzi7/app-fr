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
        "https://i.picsum.photos/id/110/500/300.jpg?hmac=BH32INqyaSkvZF-_HyDip3MypRBR5VZGUFc-5Chzq3U",
        "https://i.picsum.photos/id/13/500/300.jpg?hmac=wOBu-PTe-XaqcP3dewVwSDf_lr2eFWzePY5VvVYpaKE",
        "https://i.picsum.photos/id/484/500/300.jpg?hmac=8vuJYLbn1OgOj-fLcWhT_O1Z9aN1FW_fLLpcv1qg3gU"
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
      slide_id: "632a072930305800b2d85929",
      titulo: "Título Slide 2",
      img: [
        "https://i.picsum.photos/id/807/500/300.jpg?hmac=onOmKaZ_Ly9-uK2VnGJ7bcBktARfsHQLxe7-3Mzsutw",
        "https://i.picsum.photos/id/590/500/300.jpg?hmac=H81O3sxp2mmY9hUBiVdf6atPN3xwj4cE8SgOYNHjo-8",
        "https://i.picsum.photos/id/93/500/300.jpg?hmac=ptvnomcagNcNNRug7l5F-njPnDomzuid4oyoG3RU760"
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
        "https://i.picsum.photos/id/807/500/300.jpg?hmac=onOmKaZ_Ly9-uK2VnGJ7bcBktARfsHQLxe7-3Mzsutw",
        "https://i.picsum.photos/id/590/500/300.jpg?hmac=H81O3sxp2mmY9hUBiVdf6atPN3xwj4cE8SgOYNHjo-8",
        "https://i.picsum.photos/id/93/500/300.jpg?hmac=ptvnomcagNcNNRug7l5F-njPnDomzuid4oyoG3RU760"
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
        "https://i.picsum.photos/id/623/500/300.jpg?hmac=OUAxKPt0B8uLnMZu2sd2RqKwjXHWeHtnwpjgCZF1VsA",
        "https://i.picsum.photos/id/689/500/300.jpg?hmac=OH0jqX6NJ4qQEmNplbhuu1hSC0sLW6E5LoOZXfwEXgU",
        "https://i.picsum.photos/id/287/500/300.jpg?hmac=JVomgxvCJIk7XdCNmp5cQpuUeXCzBT2yVtLV8Pfv4lY"
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
        "https://i.picsum.photos/id/313/500/300.jpg?hmac=L03uD5obkq0rlYuk6Ii1-gFu5c351KYVldfSqPLuZq0",
        "https://i.picsum.photos/id/933/500/300.jpg?hmac=2oHk2wJ-fdK4K5Ks5ffNavRlB87SD5e1Tkg41lIIDDU",
        "https://i.picsum.photos/id/480/500/300.jpg?hmac=VGCWKIwbGVtxXuDSExsh_W75y7npzSlC5ly_hTbej9g"
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
        "https://i.picsum.photos/id/110/500/300.jpg?hmac=BH32INqyaSkvZF-_HyDip3MypRBR5VZGUFc-5Chzq3U",
        "https://i.picsum.photos/id/13/500/300.jpg?hmac=wOBu-PTe-XaqcP3dewVwSDf_lr2eFWzePY5VvVYpaKE",
        "https://i.picsum.photos/id/484/500/300.jpg?hmac=8vuJYLbn1OgOj-fLcWhT_O1Z9aN1FW_fLLpcv1qg3gU"
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
      slide_id: "637553909f3be72c6373bb8e",
      titulo: "Fotografía panorámica",
      img: [
        "https://i.picsum.photos/id/110/500/300.jpg?hmac=BH32INqyaSkvZF-_HyDip3MypRBR5VZGUFc-5Chzq3U",
        "https://i.picsum.photos/id/13/500/300.jpg?hmac=wOBu-PTe-XaqcP3dewVwSDf_lr2eFWzePY5VvVYpaKE",
        "https://i.picsum.photos/id/13/500/300.jpg?hmac=wOBu-PTe-XaqcP3dewVwSDf_lr2eFWzePY5VvVYpaKE",
        "https://i.picsum.photos/id/484/500/300.jpg?hmac=8vuJYLbn1OgOj-fLcWhT_O1Z9aN1FW_fLLpcv1qg3gU"
      ],
      fechas: [
        "02/02/2001",
        "02/02/2010",
        "02/02/2010",
        "02/02/2020"
      ],
      descripciones: [
        "Esta es una descripcion para la imágen del antes.",
        "Esta es una descripcion para la imágen del durante.",
        "Esta es una descripcion para la imágen del justo después.",
        "Esta es una descripción para la imágen del ahora."
      ],
      likes: [ "632a072930305800b2d85221", 
      "632a072930305800b2d85222"
      ],
      fecha_subida: "01/01/2022",
      aceptado: true
    }
  ]

  profileId: string;
  refMemoria: string;
  userId: string = '632a072930305800b2d85221';
  labels: string[] = ['Antes','Durante','J. Después','Ahora']
  labels_2: string[] = ['Antes','J. Después','Ahora']

  aColor: String[][] = [];

  @ViewChildren('mySwiper') components: QueryList<SwiperComponent>;

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






}
