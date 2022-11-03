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
  newUrl:    string;
  public colorBotones: string[] = ['success', 'warning', 'warning'];
  public updatedImage: string;
  public webcamImage:  WebcamImage = null;
  public valueSlider;

  public sonidos: HTMLAudioElement[] = [ new Audio(), new Audio() ]
  public colorSound:  string[] = ['light','light']
  public nameDefault: string[] = ['mic-off','volume-mute']
  public namePlay:    string[] = ['mic','volume-high']
  public nameStop:    string[];
  public imagenes:    string[] = [
    'https://i.imgur.com/YZ0wpa6.jpg',
    'https://images.newscientist.com/wp-content/uploads/2015/10/mg22830412.800-1_800.jpg?width=1200',
  ];

  public ahora = 'https://i.imgur.com/YZ0wpa6.jpg'

  //deshabilitar icono para cambiar de camara (frontal o trasera)
  public allowCameraSwitch = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private screenOrientation: ScreenOrientation
  ) {}

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.screenOrientation.lock('landscape').catch((error) => {
      console.log('Función Nativa : No permitida en Browser');
    });
    this.updatedImage = this.imagenes[0];
    this.valueSlider = 50;
    
    this.newUrl = 'memoria/' + this.profileId;
    this.setAudio();
  }

  handleImage(webcamImage: WebcamImage): void {
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

  setAudio(): void{
    this.sonidos[0].src = '../../assets/audio/sound-1.mp3'
    this.sonidos[1].src = '../../assets/audio/fire-1.mp3'
    this.sonidos[0].load()
    this.sonidos[1].load()

    this.nameStop = ['mic-off','volume-mute']
  }

  reprodSonido(index:number): void{
    if(!this.sonidos[index].paused){ 
      this.sonidos[index].pause();
      this.sonidos[index].currentTime = 0;
      this.colorSound[index] = 'light'    
      this.nameDefault[index] = this.nameStop[index]
    }
    else{ 
      this.sonidos[index].play();
      this.colorSound[index] = 'success'
      this.nameDefault[index] = this.namePlay[index]
    }

  }
}
