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
      })
      
    
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
