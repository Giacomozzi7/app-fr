import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-listener',
  templateUrl: './listener.component.html',
  styleUrls: ['./listener.component.scss'],
})
export class ListenerComponent implements OnInit {
  @Output() clickValue = new EventEmitter();

  dato: any;
  public orientation: any;
  titulo: string;
  dataFail: boolean = false;

  constructor(public toastController: ToastController) { }

  ngOnInit() {
  }


  async presentToast(data: string, duration: number, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: data,
      duration: duration,
      animated: true,
      position: position,
    });
    toast.present();
  }


  @HostListener('window:deviceorientationabsolute', ['$event'])
  public onDeviceOrientation({ alpha }: DeviceOrientationEvent): void {
    this.orientation = alpha;
    console.log(this.orientation);

    console.log(this.orientation);
    // this.presentToast(this.orientation, 50, "bottom");

    if(this.orientation == null){
      this.dataFail = true;
      this.clickValue.emit({ valorFlag: this.dataFail })
    }

    if(this.orientation > 0 && this.orientation < 10){//
      this.presentToast("Apunta al este", 500, "top");
      this.titulo = "este";
    }

    if(this.orientation >85 && this.orientation < 95){
      this.presentToast("Apunta al norte", 500, "top");
      this.titulo = "Apunta al norte";
    }

    if(this.orientation >175 && this.orientation < 185){
      this.presentToast("Apunta al oeste", 500, "top");
      this.titulo = "Apunta al oeste";
    }

    if(this.orientation >265 && this.orientation < 275){//
      this.presentToast("Apunta al sur", 500, "top");
      this.titulo = "Apunta al sur";
    }
  }

  hapticsImpactMedium = async () => {
    await Haptics.impact({ style: ImpactStyle.Medium });
  };
}
