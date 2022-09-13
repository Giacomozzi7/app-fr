import { Component, Input, OnInit, ViewChild, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { IonSlides, IonItem, IonModal } from '@ionic/angular';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent implements OnInit {

  //Inputs de mapa
  @Input() filtros;
  @Input() aMarkers;
  @Input() map;

  //Output para color icono filtros
  @Output() colorEmitter = new EventEmitter<string>();

  //Childrens 
  @ViewChild('mySlider') mySlider: IonSlides;
  @ViewChildren('itemTipo') itemTipo: QueryList<IonItem>;
  @ViewChildren('itemZona') itemZona: QueryList<IonItem>;
  @ViewChildren('itemFecha') itemFecha: QueryList<IonItem>;
  @ViewChild('modal') modal: IonModal;

  constructor() { }
  ngOnInit() {}

  //Handler select 
  handleChange(ev){
    let change = ev.target.value;
    this.mySlider.lockSwipes(false)
    if (change=='categoria') this.mySlider.slideTo(0);
    if (change == 'fecha')   this.mySlider.slideTo(2);
    if (change=='zona')      this.mySlider.slideTo(1);
    this.mySlider.lockSwipes(true)
  }

  //Quita los marcadores del mapa
  quitarMarkers() {
    this.aMarkers.forEach((mk) => {
      mk.setMap(null);
    });
  }

  //Vuelve a renderizar los marcadores aplicando filtros
  resetMarkers(){
    this.aMarkers.forEach((mk) => {
      let a = this.filtros.Tipo.filter(e => e.valor === mk.tipo && e.isChecked === "true").length > 0
      let b = this.filtros.Zona.filter(e => e.valor === mk.zona && e.isChecked === "true").length > 0
      let c = this.filtros.Fecha.filter(e => 
        parseInt(e.valor.split('-')[0]) <= parseInt(mk.fecha.split('-')[2])  
        && 
        parseInt(e.valor.split('-')[1]) >= parseInt(mk.fecha.split('-')[2])
        &&
        e.isChecked === "true").length > 0

      if (a && b && c) mk.setMap(this.map);  
    });
  }

  aplicarFiltro(){
    let arrayChecked: string[] = [];
    
    let arrayFiltros = [
      this.itemTipo.toArray(),
      this.itemZona.toArray(),
      this.itemFecha.toArray()
    ]
    this.modal.dismiss()

    Object.keys(this.filtros).forEach((cat,index) =>{
      this.filtros[cat] = []

      arrayFiltros[index].forEach(val =>{
        let valor = val['el'].innerText
        let isChecked = val['el']['children'][0]['attributes']['aria-checked']['value']
        this.filtros[cat].push({valor, isChecked})  
        arrayChecked.push(isChecked)

      })
    })
    this.quitarMarkers();
    this.resetMarkers();

    //Cambia el color del icono de filtro si se activa
    arrayChecked.includes("false") 
      ? this.colorEmitter.emit('success') 
      : this.colorEmitter.emit('dark')
    
  }
}
