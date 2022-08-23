import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { IonSlides, NavController} from '@ionic/angular';
//PErmite sacar informacion de la url
import { ActivatedRoute } from '@angular/router'; 
import {HttpClient} from '@angular/common/http'


@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.page.html',
  styleUrls: ['./memoria.page.css'],
})
export class MemoriaPage implements OnInit{

  profileId : string;
  evento;

  slides = [{ 
    titulo:'Fotografía panorámica',
    img:[
      'https://i.picsum.photos/id/807/500/300.jpg?hmac=onOmKaZ_Ly9-uK2VnGJ7bcBktARfsHQLxe7-3Mzsutw',
      'https://i.picsum.photos/id/13/500/300.jpg?hmac=wOBu-PTe-XaqcP3dewVwSDf_lr2eFWzePY5VvVYpaKE',
      'https://i.picsum.photos/id/484/500/300.jpg?hmac=8vuJYLbn1OgOj-fLcWhT_O1Z9aN1FW_fLLpcv1qg3gU',

    ]},
    { 
      titulo:'Fotografía frontal',
      img:[
        'https://i.picsum.photos/id/110/500/300.jpg?hmac=BH32INqyaSkvZF-_HyDip3MypRBR5VZGUFc-5Chzq3U',
        'https://i.picsum.photos/id/590/500/300.jpg?hmac=H81O3sxp2mmY9hUBiVdf6atPN3xwj4cE8SgOYNHjo-8',
        'https://i.picsum.photos/id/93/500/300.jpg?hmac=ptvnomcagNcNNRug7l5F-njPnDomzuid4oyoG3RU760',
      ]
  },
    { 
      titulo:'Fotografía aerea',
      img:[
        'https://i.picsum.photos/id/623/500/300.jpg?hmac=OUAxKPt0B8uLnMZu2sd2RqKwjXHWeHtnwpjgCZF1VsA',
        'https://i.picsum.photos/id/689/500/300.jpg?hmac=OH0jqX6NJ4qQEmNplbhuu1hSC0sLW6E5LoOZXfwEXgU',
        'https://i.picsum.photos/id/287/500/300.jpg?hmac=JVomgxvCJIk7XdCNmp5cQpuUeXCzBT2yVtLV8Pfv4lY',
  
      ]
    },
    { 
      titulo:'Fotografía lateral',
      img:[
        'https://i.picsum.photos/id/313/500/300.jpg?hmac=L03uD5obkq0rlYuk6Ii1-gFu5c351KYVldfSqPLuZq0',
        'https://i.picsum.photos/id/933/500/300.jpg?hmac=2oHk2wJ-fdK4K5Ks5ffNavRlB87SD5e1Tkg41lIIDDU',
        'https://i.picsum.photos/id/480/500/300.jpg?hmac=VGCWKIwbGVtxXuDSExsh_W75y7npzSlC5ly_hTbej9g',
  
      ]
    }
  ]

  @ViewChildren('mySlider') components: QueryList<IonSlides>;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id')
    this.http.get('https://localhost:44373/api/Marcadores/'+ this.profileId)
        .subscribe(data => {this.evento = data[0]})

    
  }


  setAntes(num:number, ind: number){

    let aData = this.components.toArray();
    aData[ind].slideTo(num)
    /* this.sl.slideTo(num)
    this.sl2.slideTo(num)
    this.sl3.slideTo(num)
    this.sl4.slideTo(num) */


    console.log()

  }

  

}
