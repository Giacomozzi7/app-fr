import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';


@Component({
  selector: 'app-modulo-educativo',
  templateUrl: './modulo-educativo.page.html',
  styleUrls: ['./modulo-educativo.page.scss'],
})
export class ModuloEducativoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async abrirSite(direccion: string) {
    await Browser.open({ url: direccion });
  }

}

