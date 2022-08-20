import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides} from '@ionic/angular';
//PErmite sacar informacion de la url
import { ActivatedRoute } from '@angular/router'; 
import {HttpClient} from '@angular/common/http'
import { Marker } from '../../interfaces/marker';


@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.page.html',
  styleUrls: ['./memoria.page.css'],
})
export class MemoriaPage implements OnInit{

  profileId : string;
  evento;

  slides = [
    {
      img: 'https://i.picsum.photos/id/807/500/300.jpg?hmac=onOmKaZ_Ly9-uK2VnGJ7bcBktARfsHQLxe7-3Mzsutw',
      titulo:'aaa'
    },
    {
      img: 'https://i.picsum.photos/id/13/500/300.jpg?hmac=wOBu-PTe-XaqcP3dewVwSDf_lr2eFWzePY5VvVYpaKE',
      titulo:'aaa'
    },
    {
      img: 'https://i.picsum.photos/id/484/500/300.jpg?hmac=8vuJYLbn1OgOj-fLcWhT_O1Z9aN1FW_fLLpcv1qg3gU',
      titulo:'aaa'
    }
  ]

  @ViewChild('mySlider')  sl: IonSlides;
  @ViewChild('mySlider2')  sl2: IonSlides;
  @ViewChild('mySlider3')  sl3: IonSlides;
  @ViewChild('mySlider4')  sl4: IonSlides;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id')
    this.http.get('https://localhost:44373/api/Marcadores/'+ this.profileId)
        .subscribe(data => {this.evento = data[0]})

    
  }


  setAntes(num:number){
    this.sl.slideTo(num)
    this.sl2.slideTo(num)
    this.sl3.slideTo(num)
    this.sl4.slideTo(num)


    console.log('aa')

  }

  

}
