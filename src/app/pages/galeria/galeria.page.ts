import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Marker } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.css'],
})
export class GaleriaPage implements OnInit {
  profileId: string;
  refMemoria:string;
  evento: Marker;
  galeria = [
    {
      autor:'Oficina Nacional de Emergencia Del Ministerio del Interior y Seguridad Pública',
      imagen: '../assets/img/1.jpg',
    },
    {
      autor:'Imágen de Prensa',
      imagen: '../assets/img/2.jpg',
    },
    {
      autor:'Servicio Aerofotogramétrico de la Fuerza Aérea de Chile',
      imagen: '../assets/img/3.jpg',
    },
    {
      autor:'Oficina Nacional de Emergencia Del Ministerio del Interior y Seguridad Pública',
      imagen: '../assets/img/4.jpg',
    },
    {
      autor:'Oficina Nacional de Emergencia Del Ministerio del Interior y Seguridad Pública',
      imagen: '../assets/img/5.jpg',
    },
    {
      autor:'Servicio Aerofotogramétrico de la Fuerza Aérea de Chile',
      imagen: '../assets/img/6.jpg',
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
