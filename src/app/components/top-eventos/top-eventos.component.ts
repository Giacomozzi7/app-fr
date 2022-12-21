import { Component, OnInit } from '@angular/core';
import { Top } from 'src/app/interfaces/interfaces';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-top-eventos',
  templateUrl: './top-eventos.component.html',
  styleUrls: ['./top-eventos.component.scss'],
})
export class TopEventosComponent implements OnInit {

  tipo: string = 'visitas';
  topInm;
  topInt;
  topVis;
  activeTop;
  labelTipo :  string = 'Visitas';
  starsInm : string[] = []
  starsInt : string[] = []


  constructor(
    public proveedor: ProveedorService
  ) { }

  ngOnInit() {
    this.proveedor.obtenerTop().
      subscribe((data) =>{
        this.topInm = data['val_inmersion']
        this.topInt = data['val_interes']
        this.topVis = data['visitas']

        this.activeTop = [...this.topVis]
        
        this.roundValoraciones()

      })
      
    
  }

  roundValoraciones() {
    for (let i = 0; i < this.topInm.length; i++) {
      let inm = parseFloat((Math.round(this.topInm[i].valor * 2) / 2).toFixed(1))
      let int = parseFloat((Math.round(this.topInt[i].valor * 2) / 2).toFixed(1))

      this.topInm[i].valor = Array(Math.trunc(inm)).fill('star')
      this.topInt[i].valor = Array(Math.trunc(int)).fill('star')
      
      
      if(!Number.isInteger(inm)){
        this.topInm[i].valor.push('star-half')
      } 

      if(!Number.isInteger(int)){
        this.topInt[i].valor.push('star-half')
      }

    }
  }


  async segmentChanged(e){
    if (e.detail.value == 0){
      this.activeTop = [...this.topVis]
      this.labelTipo = 'Visitas'
    } else if ( e.detail.value == 1){
      this.activeTop = [...this.topInm]
      this.labelTipo = 'Prom. Inmersión'
    } else{
      this.activeTop = [...this.topInt]
      this.labelTipo = 'Prom. Interés'
    }
  }

}
