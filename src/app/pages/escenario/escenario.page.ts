import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Escenario } from 'src/app/interfaces/interfaces';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-escenario',
  templateUrl: './escenario.page.html',
  styleUrls: ['./escenario.page.scss'],
})
export class EscenarioPage implements OnInit {

  profileId:string
  escenario: Escenario;

  constructor(
    private activatedRoute: ActivatedRoute,
    public proveedor: ProveedorService,
  ) { }

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.proveedor.obtenerEscenario(this.profileId).
      subscribe((data:Escenario) =>{
        this.escenario = data[0]
      })

    
  }

}
