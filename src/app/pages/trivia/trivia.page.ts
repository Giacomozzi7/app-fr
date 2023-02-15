import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { interval } from 'rxjs';
import { ProveedorService } from '../../services/proveedor.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.page.html',
  styleUrls: ['./trivia.page.scss'],
})
export class TriviaPage implements OnInit {

  constructor(
    private alertController: AlertController,
    private shareService: ProveedorService,
    public toastController: ToastController,
    public router: Router,
    public nav: NavController
    ) { }

  categoria: any;
  altoFlag: boolean = false;
  medioFlag: boolean = false;
  bajoFlag: boolean = false;
  start: boolean = true;

  setDificultad: boolean = true;
  showPreguntas: boolean = false;
  dif: string;

  exit: string = "modulo-educativo"


  //Variables de logica portal 
  public nombre: string = "";
  //public dif: any = "";   // se saca de dificultad
  public preguntasList: any = [];
  public preguntaActual: number = 0;
  public puntaje: number = 0;
  contador: number = 20;
  contador2: number = 20;

  respuestaCorrecta: number = 0;
  respuestaIncorrecta: number = 0;
  respuestaNoRespondida: number = 0;
  interval$: any;
  progreso: string = "0";
  isQuizCompleted : boolean = false;


  ngOnInit() {
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Bienvenido a la trivia',
      subHeader: 'Instrucciones',
      message: 'Cada respuesta correcta suma 10 puntos. <br><br> Cada respuesta incorrecta resta 5 puntos. <br> <br> El tiempo limitado para responder. <br><br> ¡Buena suerte!',
      buttons:[{
        text: 'Aceptar',
        cssClass: 'alert-button-confirm',
      }],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '¿Desea salir de la trivia?',
      subHeader: 'Instrucciones',
      buttons:[{
        text: 'Si',
        cssClass: 'alert-button-confirm',
        role: 'confirm',
        handler: () => {
          this.nav.navigateBack('modulo-educativo');
          console.log('Confirm Okay');
        }
      },
      {
        text: 'No',
        cssClass: 'alert-button-confirm',
        role: 'cancel',
      }
    ],
      cssClass: 'custom-alert'
    });
    await alert.present();
    

  }



  verificarSalir(){
    if(this.showPreguntas === false){
      this.setDificultad = false;
      this.showPreguntas = false;
      this.exit = "trivia-home";
    }
    else{
      this.exit = "";
      this.presentAlertConfirm();
    }
  }

  

  //Llamada a un toast 
  async presentToast(data: string, Color: string) {
    const toast = await this.toastController.create({
      message: data,
      duration: 400,
      animated: true,
      color: Color,
      cssClass: 'my-custom-toast'
    });
    toast.present();
  }
  
  pagPreguntas(){
    this.setDificultad = false;
    this.showPreguntas = true;
    this.startTrivia();
    //Se desactiva la navegacion del header
    this.exit = "";
  }
  setAltoFlag(){
    this.altoFlag = true;
    this.medioFlag = false;
    this.bajoFlag = false;
    this.start = false;
    this.dif = "Dificil";

  }
  setMedioFlag(){
    this.altoFlag = false;
    this.medioFlag = true;
    this.bajoFlag = false;
    this.start = false;
    this.dif = "Intermedio";
  }
  setBajoFlag(){  
    this.altoFlag = false;
    this.medioFlag = false;
    this.bajoFlag = true;
    this.start = false;
    this.dif = "Facil";
  }

  startTrivia(){
    if(this.dif === "Facil"){
      this.contador2 = 20;
    }
    if(this.dif === "Intermedio"){
      this.contador2 = 15;
      this.contador = 15;
    }
    if(this.dif === "Dificil"){
      this.contador2 = 10;
      this.contador = 10;
    }

    this.getAllPreguntas();
    this.startCounter();

  }

  getAllPreguntas(){
    this.shareService.obtenerPreguntas().subscribe((res: any) => {
      console.log(res);
      this.preguntasList = res[0].preguntas;
    });
  }

  nextQuestion(){
    this.preguntaActual++;
    this.notAnswered();
    this.resetCounter();

    if(this.preguntaActual === this.preguntasList.length){
      this.isQuizCompleted = true;
      this.showPreguntas = false;
      // this.presentToast("¡Has terminado la trivia!", "");
      this.stopCounter();
    }

  }

  previousQuestion(){
    this.preguntaActual--;
  }

  notAnswered(){
    this.respuestaNoRespondida++;
  }

  answer(currentQno: number, option:any){
    if(currentQno === this.preguntasList.length){
      this.isQuizCompleted = true;
      this.showPreguntas = false;
      // this.presentToast("¡Has terminado la trivia!", "");
      this.stopCounter();
    }

    if(option.correcto){
      this.puntaje += 10;
      this.respuestaCorrecta++;
      this.presentToast("¡Respuesta correcta!", "success"); 

      setTimeout(() => {
        this.preguntaActual++;
        // this.presentToast("¡Siguiente pregunta!", "danger");
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);

    }else{
      setTimeout(() => {
        this.preguntaActual++;
        this.presentToast("Respuesta incorrecta", "danger");
        this.respuestaIncorrecta++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
      this.puntaje -= 10;
    }
  }

  startCounter(){
    this.interval$ = interval(1000).subscribe(val => {
      this.contador--;
      if(this.contador === 0){
        if(this.preguntaActual === this.preguntasList.length){
          this.isQuizCompleted = true;
          this.stopCounter();
        }
        this.preguntaActual++;
        this.contador = this.contador2;
        this.puntaje -= 10;
        //aqui va contador de preguntas no respondidas
        console.log("Respuesta no respondida");
        this.notAnswered()
        console.log(this.respuestaNoRespondida);

        if(this.preguntaActual === this.preguntasList.length){
          this.isQuizCompleted = true;
          this.showPreguntas = false;
          this.stopCounter();
        }

      }
      });

    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);  
  }

  stopCounter(){
    this.interval$.unsubscribe();
    this.contador = 0;
  }

  resetCounter(){
    this.stopCounter();
    this.contador = this.contador2;
    this.startCounter();
  }

  resetQuiz(){
    this.resetCounter();
    this.getAllPreguntas();
    this.puntaje = 0;
    this.contador = this.contador2;
    this.preguntaActual = 0;
    this.progreso = "0";
    this.respuestaCorrecta = 0;
    this.respuestaIncorrecta = 0;
    this.respuestaNoRespondida = 0;
  }

  getProgressPercent(){
    this.progreso = (this.preguntaActual/this.preguntasList.length * 100).toString();
    return this.progreso;
  }





}
