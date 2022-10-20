import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { IonRow, IonSlides, NavController } from '@ionic/angular';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
//PErmite sacar informacion de la url
import { ActivatedRoute } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.page.html',
  styleUrls: ['./memoria.page.css'],
})
export class MemoriaPage implements OnInit {
  profileId: string;
  evento;
  refGaleria: string;
  aColor: String[][] = [];


  @ViewChildren('mySlider') components: QueryList<IonSlides>;

  constructor(
    private activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public proveedor: ProveedorService,
    private screenOrientation: ScreenOrientation,
  ) {}

  ngOnInit() {
    this.screenOrientation.unlock();
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.refGaleria = 'galeria/'+ this.profileId;

    this.proveedor.obtenerEvento(this.profileId)
      .subscribe((data) => {
        this.evento = data[0];
        console.log(this.evento.memoria)
        this.genButtonColors();
        this.lockSlides();
        this.buscarUsuarios()
      });
  }

  //Bloquea los slides para que solo sean controlables por botones
  lockSlides() {
    //this.component asincrono
    this.components.changes.subscribe((aSL) => {
      let arraySlides = aSL.toArray();
      arraySlides.forEach((slide) => {
        slide.lockSwipes(true);
      });
    });
  }

  //Genera los colores para todo el conjunto de botones
  genButtonColors() {
    this.aColor = [];
    for (let i = 0; i < this.evento.memoria.length; i++) {
      this.aColor.push(['dark', 'warning', 'warning']);
    }
  }

  //Evento de click sobre cada boton
  clickBtn(num: number, ind: number) {
    let aData = this.components.toArray();
    aData[ind].lockSwipes(false)
    aData[ind].slideTo(num);
    this.aColor[ind] = ['warning', 'warning', 'warning'];
    this.aColor[ind][num] = 'dark';
    aData[ind].lockSwipes(true)
    
  }

  buscarUsuarios(){
    for (let i = 0; i < this.evento.memoria.length; i++) {
      let userId = this.evento.memoria[i]['usuario_id']
      this.proveedor.obtenerUsuario(userId)
        .subscribe((usuario) => {
          console.log(usuario)
          let strNombre = usuario[0]['nombre'] + " "+ usuario[0]['apellido']
          this.evento.memoria[i]['usuario_id'] = strNombre
        })
   }

  }

}
