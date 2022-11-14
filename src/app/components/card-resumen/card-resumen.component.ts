import { Component, Input, OnInit } from '@angular/core';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-card-resumen',
  templateUrl: './card-resumen.component.html',
  styleUrls: ['./card-resumen.component.scss'],
})
export class CardResumenComponent implements OnInit {
  @Input() profileId;
  evento;

  constructor(
    public proveedor: ProveedorService,
  ) { }

  ngOnInit() {

    this.proveedor.obtenerResumen(this.profileId)
      .subscribe((data) => {
        this.evento = data[0];
        console.log(this.evento)
        this.buscarData();
      });

  }

  buscarData(){
    this.proveedor.obtenerEscenario(this.evento.escenario_id)
      .subscribe((data) =>{
        this.evento.escenario_id = data[0].titulo
        this.buscarCategoria();
      })

  }

  buscarCategoria(){
    this.proveedor.obtenerCategoria(this.evento.categoria)
      .subscribe((data) =>{
        this.evento.categoria = data[0].tipo
      })

  }
    
}


