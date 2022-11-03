import { Component, Input, OnInit } from '@angular/core';
import { DatosInteres } from 'src/app/interfaces/interfaces';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-datos-interes',
  templateUrl: './datos-interes.component.html',
  styleUrls: ['./datos-interes.component.scss'],
})
export class DatosInteresComponent implements OnInit {

  @Input() profileId;
  public datosInteres: DatosInteres[];
  public indexDato: number = 0;

  constructor(
    public proveedor: ProveedorService,
  ) { }

  ngOnInit() {
    console.log(this.profileId)
    this.proveedor.obtenerDatosInteres(this.profileId)
      .subscribe((data) => {
        this.datosInteres = data[0].datos_interes
      });
  }

  cambiarDato(mov: string){
    if (mov === 'izq'){
      this.indexDato === 0 
        ? this.indexDato = this.datosInteres.length - 1
        : this.indexDato--
    }

    if (mov === 'der'){
      this.indexDato === this.datosInteres.length - 1
        ? this.indexDato = 0
        : this.indexDato++
    }
  }
}


