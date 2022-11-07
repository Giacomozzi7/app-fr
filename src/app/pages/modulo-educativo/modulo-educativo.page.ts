import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';


@Component({
  selector: 'app-modulo-educativo',
  templateUrl: './modulo-educativo.page.html',
  styleUrls: ['./modulo-educativo.page.scss'],
})
export class ModuloEducativoPage implements OnInit {

  // degtorad: number = Math.PI / 180; // Degree-to-Radian conversion

  constructor() { }

  ngOnInit() {
    window.addEventListener("deviceorientationabsolute", (e:DeviceOrientationEvent)=>{ 
      console.log(e.alpha, "valor de alfa"); 
    }, true); 
  }

  async abrirSite(direccion: string) {
    await Browser.open({ url: direccion });
  }

  // rotacion(){
  //   window.addEventListener("deviceorientation", function(event) {
  //     // process event.alpha, event.beta and event.gamma
  //     // console.log(event.alpha);
  //     // console.log(event.beta);
  //     // console.log(event.gamma);
  //     let degtorad = Math.PI / 180;

  //     let alpha = event.alpha;
  //     let beta = event.beta;
  //     let gamma = event.gamma;

  //     let _x = beta  ? beta  * degtorad : 0; // beta value
  //     let _y = gamma ? gamma * degtorad : 0; // gamma value
  //     let _z = alpha ? alpha * degtorad : 0; // alpha value

  //     let cX = Math.cos( _x );
  //     let cY = Math.cos( _y );
  //     let cZ = Math.cos( _z );
  //     let sX = Math.sin( _x );
  //     let sY = Math.sin( _y );
  //     let sZ = Math.sin( _z );

  //     // Calculate Vx and Vy components
  //     let Vx = - cZ * sY - sZ * sX * cY;
  //     let Vy = - sZ * sY + cZ * sX * cY;

  //     // Calculate compass heading
  //     let compassHeading = Math.atan( Vx / Vy );

  //     // Convert compass heading to use whole unit circle
  //     if( Vy < 0 ) {
  //       compassHeading += Math.PI;
  //     } else if( Vx < 0 ) {
  //       compassHeading += 2 * Math.PI;
  //     }
  //     return compassHeading * ( 180 / Math.PI ); // Compass Heading (in degrees)
      
  //   }, true);
  // }
   
}

