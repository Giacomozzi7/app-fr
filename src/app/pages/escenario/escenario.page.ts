import { Component, OnInit } from '@angular/core';
import { Escenario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-escenario',
  templateUrl: './escenario.page.html',
  styleUrls: ['./escenario.page.scss'],
})
export class EscenarioPage implements OnInit {

  escenario: Escenario = {
    id : 'abcd',
    titulo: 'Escenario 1',
    descrip_corta: 'Párrafo que describe de forma breve las características del escenario y generalidades sobre éste.',
    descripcion: 'Valdivia es una comuna y ciudad de la zona sur de Chile, capital de la provincia homónima y de la Región de Los Ríos. Se encuentra a 847,6 km al sur de Santiago, la capital de Chile. Está emplazada en la confluencia de los ríos Calle-Calle, Cau-cau y el río Cruces, y se encuentra a 15 km de la bahía de Corral. ' + 
                 'Según el censo nacional realizado en 2017 por el Instituto '+ 
                 'Nacional de Estadísticas de Chile, Valdivia tiene una población ' + 
                 'de 166 080 habitantes.',
    ciudades: ['Valdivia','Osorno','Corral'],
    slides: [
      {
        titulo:'Vista aérea ciudad de Valdivia',
        img_url: 'https://tejasur.cl/wp-content/uploads/2022/07/BLOG-_5-ventajas-blog.jpg',
        fecha: '01/02/2022'
      },
      {
        titulo:'Rios ciudad de Valdivia',
        img_url: 'https://i0.wp.com/laderasur.com/wp-content/uploads/2018/03/Valdivia.jpg',
        fecha: '01/02/2022'
      },
      {
        titulo:'Costanera ciudad de Valdivia',
        img_url: 'https://thumbs.dreamstime.com/b/orilla-en-valdivia-97082178.jpg',
        fecha: '01/02/2022'
      } 
    ]
  }

  constructor() { }

  ngOnInit() {
  }

}
