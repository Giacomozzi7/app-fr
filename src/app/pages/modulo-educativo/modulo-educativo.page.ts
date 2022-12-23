import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ModEducativo } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-modulo-educativo',
  templateUrl: './modulo-educativo.page.html',
  styleUrls: ['./modulo-educativo.page.scss'],
})
export class ModuloEducativoPage implements OnInit {

  tarjetaHead
  tarjetas
  // tarjetas: ModEducativo[];

  card: any;

  constructor(
    private screenOrientation: ScreenOrientation,
    public proveedor: ProveedorService
    ) { }

  ngOnInit() {
    this.screenOrientation.lock('portrait').catch((error) => {
      console.log('Función Nativa : No permitida en Browser');
    }); 
    
    this.proveedor.obtenerTarjetas()
    .subscribe((data) =>{
      console.log(data)
      this.tarjetas = data;
      console.log(this.tarjetas)
      // this.tarjetas = data[0]['data'];
      this.tarjetaHead = this.tarjetas[0];
    })    
  }

  async abrirSite(direccion: string) {
    if(direccion == null){
      
    }
    else{
      await Browser.open({ url: direccion });
    }
  }
  
}

