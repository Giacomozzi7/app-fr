import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-modulo-educativo',
  templateUrl: './modulo-educativo.page.html',
  styleUrls: ['./modulo-educativo.page.scss'],
})
export class ModuloEducativoPage implements OnInit {

  constructor(
    private screenOrientation: ScreenOrientation) { }

  ngOnInit() {
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  async abrirSite(direccion: string) {
    await Browser.open({ url: direccion });
  }
  
}

