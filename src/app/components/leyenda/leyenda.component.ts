import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-leyenda',
  templateUrl: './leyenda.component.html',
  styleUrls: ['./leyenda.scss'],
})
export class LeyendaComponent implements OnInit {
  public aLeyenda = [];
  @Input() mapcolors;
  
  constructor() { }

  ngOnInit() {
    this.generarLeyenda()
  }

  //Genera un arreglo con objetos pertenecientes a la leyenda
  generarLeyenda(){
    Object.keys(this.mapcolors).forEach((key) => {
      let ob = {
            nombre: key,
            url: '../../assets/icon/' + this.mapcolors[key] + '.png'
      }
      this.aLeyenda.push(ob) 
    });
  }

}
