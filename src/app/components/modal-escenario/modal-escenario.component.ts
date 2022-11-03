import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, EffectFade, EffectCube } from 'swiper';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, EffectFade, EffectCube]);



@Component({
  selector: 'app-modal-escenario',
  templateUrl: './modal-escenario.component.html',
  styleUrls: ['./modal-escenario.component.scss'],
})
export class ModalEscenarioComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  constructor() { }

  ngOnInit() {}

  // isModalOpen = false;

  setOpen() {
    this.modal.dismiss();
  }
}
