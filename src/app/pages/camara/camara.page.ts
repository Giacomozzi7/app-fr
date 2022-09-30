import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {
  profileId: string;
  newUrl: string;
  public colorBotones: string[] = ['success', 'warning', 'warning'];
  public updatedImage: string;
  public webcamImage: WebcamImage = null;
  public valueSlider;
  public imagenes: string[] = [
    'https://i.picsum.photos/id/688/910/390.jpg?hmac=K9L5TPYR-Uki6vFIFgladr03Hn6B0emM22RRgOEcMiI',
    'https://i.picsum.photos/id/547/910/390.jpg?hmac=QD4h99yrJR1UTbBBWcCCNYa_o2MtDi_YbUjWxlex1Bo',
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private screenOrientation: ScreenOrientation
  ) {}

  ngOnInit() {
    this.screenOrientation.lock('landscape').catch((error) => {
      console.log('Función Nativa : No permitida en Browser');
    });

    this.updatedImage = this.imagenes[0];
    this.valueSlider = 50;
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.newUrl = 'memoria/' + this.profileId;
  }

  handleImage(webcamImage: WebcamImage): void {
    console.info('Imagen recibida', webcamImage);
    this.webcamImage = webcamImage;
  }

  cambiarImagen(index: number): void {
    if (index < 2){
      this.updatedImage = this.imagenes[index]
      this.valueSlider = 50;
    }
    else{
      this.valueSlider = 0;
    }

    this.colorBotones = ['warning', 'warning', 'warning'];
    this.colorBotones[index] = 'success';
    
  }
}
