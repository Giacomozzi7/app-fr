import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-modal-brujula',
  templateUrl: './modal-brujula.component.html',
  styleUrls: ['./modal-brujula.component.scss'],
})
export class ModalBrujulaComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  flag: boolean = false;

  constructor() { }

  ngOnInit() {}

  ngOnDestroy() {
    this.flag=false;
  }

  closeModal() {
    this.modal.dismiss();
  }

  setFlag(){
    this.flag = true;
  }

  disableFlag(){
    this.flag = false;
  }
}

