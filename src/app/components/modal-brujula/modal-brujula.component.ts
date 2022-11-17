import { Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modal-brujula',
  templateUrl: './modal-brujula.component.html',
  styleUrls: ['./modal-brujula.component.scss'],
})
export class ModalBrujulaComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  flag: boolean = false;
  

  constructor(
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  ngOnDestroy() {
    this.flag=false;
  }

  closeModal() {
    this.flag = false;
    this.modal.dismiss();
  }

  setFlag(){
    this.flag = true;
  }

  disableFlag(){
    this.flag = false;
  }

  escuchaClick(event){
    console.log(typeof(event.valorFlag));

    if(event.valorFlag == true){
      this.closeModal();
    }
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Advertencia!!!',
      subHeader: 'Contenido no soportado',
      message: 'Esta funcionalidad no esta disponible en tu dispositivo',
      buttons:[{
        text: 'Aceptar',
        cssClass: 'alert-button-confirm',
      }],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }
}

