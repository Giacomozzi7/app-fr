import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Marker } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
})
export class GaleriaPage implements OnInit {
  profileId: string;
  refMemoria:string;
  evento: Marker;
  galeria = [
    {
      autor:'ONEMI',
      imagen: '../assets/img/1.jpg',
      likes: 22,
      descripcion:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus finibus risus in massa placerat feugiat et non leo. Nullam ac pulvinar lectus. Nullam eu urna et dui porta bibendum nec.'
    },
    {
      autor:'FACH',
      imagen: '../assets/img/2.jpg',
      likes: 132,
      descripcion: 'Nullam ut maximus ex. Integer enim diam, suscipit porttitor turpis et, dictum efficitur odio. Cras vulputate dolor sed arcu laoreet, quis porta metus aliquam. Nam id tristique lectus, tempus elementum.'
    },
    {
      autor:'FACH',
      imagen: '../assets/img/3.jpg',
      likes: 17,
      descripcion: 'Donec fringilla pharetra posuere. Quisque a sapien scelerisque, blandit nulla id, interdum dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed eget gravida neque.'
    },
    {
      autor:'Francisco Giacomozzi',
      imagen: '../assets/img/4.jpg',
      likes: 204,
      descripcion:'Ut turpis ligula, aliquet non tellus non, mattis rhoncus lacus. Etiam semper accumsan consequat. Vestibulum pharetra, arcu in imperdiet tristique, quam orci venenatis nulla, eu auctor erat diam malesuada ipsum.'
    },
    {
      autor:'Francisco Giacomozzi',
      imagen: '../assets/img/5.jpg',
      likes: 101,
      descripcion: 'Suspendisse potenti. Duis laoreet nibh eu finibus dignissim. Sed in orci vitae lorem viverra porta vitae ornare leo. Morbi tellus lacus, vulputate sit amet finibus sit amet, dignissim eu leo.'
    },
    {
      autor:'Claudio Lizama',
      imagen: '../assets/img/6.jpg',
      likes: 77,
      descripcion: 'Donec enim magna, vestibulum et eleifend vitae, maximus sed magna. Pellentesque nulla tellus, tempor quis imperdiet venenatis, fermentum vestibulum sem. In ac aliquam orci, pretium ultricies odio. Aliquam ut scelerisque.'
    }

  ]

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.refMemoria = 'memoria/'+ this.profileId;

    this.http
      .get('https://localhost:44373/api/Marcadores/' + this.profileId)
      .subscribe((data: Marker[]) => {
        this.evento = data[0];

      });
  }

}
