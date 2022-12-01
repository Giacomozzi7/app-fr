import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Howl } from 'howler';
import { IonRange } from '@ionic/angular';
import { Relato} from 'src/app/interfaces/interfaces';
import { WebElementCondition } from 'selenium-webdriver';

@Component({
  selector: 'app-relatos',
  templateUrl: './relatos.page.html',
  styleUrls: ['./relatos.page.scss'],
})

export class RelatosPage implements OnInit {
  profileId: string;
  refMemoria:string;
  relatos: Relato[];
  audioUrl: string;
  myRelStr: string = 'Mis Relatos';
  myRel : boolean = false;
  refAgregarRelato: string;
  userId = "632a072930305800b2d85221"
  misRelatos: boolean = false;
  refEditarRelato: string;

  activeTrack: Relato = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;
  @ViewChild('range', {static: false}) range:IonRange;

  constructor(
    private activatedRoute: ActivatedRoute,
    public proveedor: ProveedorService,
  ) { }

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.refMemoria = 'memoria/'+ this.profileId;
    this.refAgregarRelato = 'agregar-relato/' + this.profileId + '/agregar/""'
    this.refEditarRelato = 'agregar-relato/' + this.profileId + '/editar/'
    this.obtRelatos()

  }

  obtRelatos(){
    this.proveedor.obtenerRelatos(this.profileId)
    .subscribe((data) => {
      this.relatos = data[0].relatos;
      this.buscarUsuarios()
      this.fillLikes()
    });

  }

  fillLikes(){
    this.relatos = this.relatos.map((element: Relato) =>{
      if (element.likes.includes(this.userId)){
        return {
          ...element,
          like_name: 'heart'
        }
      } 
      else {
        return {
          ...element,
          like_name: 'heart-outline'
        }
      }
    })
  }

  toggleRelatos(){
    console.log('a')
    
    if (this.myRel === false){
      this.relatos = this.relatos.filter(obj => obj.usuario_id === this.userId)
      this.myRel= true;
      this.myRelStr = 'Todos';
      this.misRelatos = true
    } else{
      this.obtRelatos()
      this.myRel = false;
      this.myRelStr = 'Mis Relatos'
      this.misRelatos = false
    }
  }

  buscarUsuarios(){
    this.relatos.forEach((element:Relato) =>{
      let userId = element['usuario_id']
      this.proveedor.obtenerUsuario(userId)
        .subscribe((usuario) =>{
          element['usuario_name'] = 
            usuario[0]['nombre'] +
            " " +
            usuario[0]['apellido']
        })
    }) 
  }



  //Funciones para el control del reproductor
  start(relato: Relato){
    if (this.player){ //si hay algo reproduciendose, se detiene
      this.player.stop()
    }
    this.player = new Howl({
      src: [relato.contenido],
      html5: true,
      onplay: () =>{
        console.log('onplay')
        this.isPlaying = true;
        this.activeTrack = relato;
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
    let index = this.relatos.indexOf(this.activeTrack)
    if (index!= this.relatos.length - 1){
      this.start(this.relatos[index + 1])
    } else{
      this.start(this.relatos[0])
    }
  }

  prev(){
    let index = this.relatos.indexOf(this.activeTrack);
    if (index > 0){
      this.start(this.relatos[index - 1]);    
    } else {
      this.start(this.relatos[this.relatos.length - 1])
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

  

  

 
}


