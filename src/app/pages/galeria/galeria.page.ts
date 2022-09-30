import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Marker } from 'src/app/interfaces/interfaces';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
})
export class GaleriaPage implements OnInit {
  profileId: string;
  refMemoria:string;
  evento;

  constructor(
    private activatedRoute: ActivatedRoute,
    public proveedor: ProveedorService,
  ) { }

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.refMemoria = 'memoria/'+ this.profileId;

    this.proveedor.obtenerEvento(this.profileId)
      .subscribe((data) => {
        this.evento = data[0];
        this.buscarUsuarios()
      });
  }

  buscarUsuarios(){
    for (let i = 0; i < this.evento.galeria.length; i++) {
      let userId = this.evento.galeria[i]['usuario_id']
      this.proveedor.obtenerUsuario(userId)
        .subscribe((usuario) => {
          let strNombre = usuario[0]['nombre'] + " "+ usuario[0]['apellido']
          this.evento.galeria[i]['usuario_id'] = strNombre
        })
   }

  }



}
