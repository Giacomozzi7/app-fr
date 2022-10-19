import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {


  @Input() titulo: string;
  @Input() subtitulo: string;
  @Input() imagen: string;
  @Input() contenido: string;
  @Input() icono: string;
  @Input() url: string;
  @Input() url_name: string;
  @Input() url_down: string;
  @Input() url_name_down: string

    constructor() { }

  ngOnInit() {}

}
