import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.page.html',
  styleUrls: ['./valoraciones.page.scss'],
})
export class ValoracionesPage implements OnInit {
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

    this.proveedor.obtenerRelatos(this.profileId).subscribe((data) => {
      this.evento = data[0];
      console.log(this.evento)
    });
  }

}
