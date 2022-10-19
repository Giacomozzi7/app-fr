import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() titulo: string;
  @Input() subtitulo: string;
  @Input() contenido: string;
  @Input() icono: string;
  @Input() iconoColor: string;
  @Input() url: string;
  @Input() urlName: string;
  @Input() urlDown: string;
  @Input() urlNameDown: string

    constructor() { }

  ngOnInit() {}

}
