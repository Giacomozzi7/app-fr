import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Howl } from 'howler';
import { IonRange } from '@ionic/angular';
import { Track } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-relatos',
  templateUrl: './relatos.page.html',
  styleUrls: ['./relatos.page.scss'],
})

export class RelatosPage implements OnInit {
  profileId: string;
  refMemoria:string;
  evento;
  audioUrl: string;
  playlist: Track[] = [];

  activeTrack: Track = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;
  @ViewChild('range', {static: false}) range:IonRange;

  constructor(
    private activatedRoute: ActivatedRoute,
    public proveedor: ProveedorService,
  ) { }

  start(track: Track){
    if (this.player){ //si hay algo reproduciendose, se detiene
      this.player.stop()
    }
    this.player = new Howl({
      src: [track.path],
      html5: true,
      onplay: () =>{
        console.log('onplay')
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress();
      },
      onend: () =>{
        console.log('onend')

      }
    });
    this.player.play();
  }

  togglePlayer(pause){
    this.isPlaying= !pause;
    if(pause){
      this.player.pause();
    }
    else{
      this.player.play();
    }

  }

  next(){
    let index = this.playlist.indexOf(this.activeTrack)
    if (index!= this.playlist.length - 1){
      this.start(this.playlist[index + 1])
    } else{
      this.start(this.playlist[0])
    }
  }

  prev(){
    let index = this.playlist.indexOf(this.activeTrack);
    if (index > 0){
      this.start(this.playlist[index - 1]);    
    } else {
      this.start(this.playlist[this.playlist.length - 1])
    }
  }

  seek(){
    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));

  }

  updateProgress(){
    let seek = this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0;
    setTimeout(() => {
      this.updateProgress();
    }, 1000)

  }

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.refMemoria = 'memoria/'+ this.profileId;

    this.proveedor.obtenerRelatos(this.profileId)
    .subscribe((data) => {
      this.evento = data[0];
      this.generarPlaylist();
      this.buscarUsuarios()
    });
  }

  buscarUsuarios(){
    for (let i = 0; i < this.playlist.length; i++) {
      let userId = this.playlist[i]['usuario_id']
      console.log(userId)
      this.proveedor.obtenerUsuario(userId)
        .subscribe((usuario) => {
          let strNombre = usuario[0]['nombre'] + " "+ usuario[0]['apellido']
          this.playlist[i]['usuario_id'] = strNombre
        })
   }

  }


  generarPlaylist(){
    this.evento.relatos.forEach(relato => {
      if (relato.aceptado === true){
        let objRelato = {
          "name" : relato.titulo,
          "path": relato.contenido,
          "fecha_subida": relato.fecha_subida,
          "usuario_id": relato.usuario_id,
          "likes": relato.likes
        }
        this.playlist.push(objRelato);
      }
    });

  }
}


