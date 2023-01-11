import { Component, OnInit } from '@angular/core';

import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-trivia-home',
  templateUrl: './trivia-home.page.html',
  styleUrls: ['./trivia-home.page.scss'],
})
export class TriviaHomePage implements OnInit {

  datos: any = [] 
  users: string[] = []

  constructor(
    public proveedor: ProveedorService
  ) { }

  ngOnInit() {
    this.proveedor.obtenerRanking()
    .subscribe((data) =>{
      this.datos = data
      console.log(data)
      this.buscarUsuarios()
    }) 
  }


  flagFacil: boolean = true;
  flagMedio: boolean = false;
  flagDificil: boolean = false;


  async cambioSegment(value: string){
    if(value == '1'){
      console.log('nivel facil');
      this.flagFacil = true;
      this.flagMedio = false;
      this.flagDificil = false;
    }

    if(value == '2'){
      console.log('nivel medio');
      this.flagFacil = false;
      this.flagMedio = true;
      this.flagDificil = false;
    }

    if(value == '3'){
      console.log('nivel dificil');
      this.flagFacil = false;
      this.flagMedio = false;
      this.flagDificil = true;
    }
  }

  buscarUsuarios(){
    for (let i = 0; i < this.datos.length; i++) {
      let userId = this.datos[i].user_id
      this.proveedor.obtenerUsuario(userId)
        .subscribe((usuario) => {
          let strNombre = usuario[0]['nombre'] + " "+ usuario[0]['apellido']
          // this.comentarios[i]['usuario_name'] = strNombre
          console.log(strNombre)
          this.users.push(strNombre)
        })
      }
   }

}
