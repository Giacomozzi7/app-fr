import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  public varService: any;


  constructor(public http: HttpClient) {}

  //Obtiene marcadores para el GIS
  obtenerMapPins(){
    return this.http.get('https://164.77.114.239:8129/api/app/page/mappins')
  }

  //Obtiene un evento especifico
  obtenerEvento(id:string){
    return this.http.get('https://164.77.114.239:8129/api/Eventos/'+ id)
  } 

  //Obtiene un usuario
  obtenerUsuario(id:string){
    return this.http.get('https://164.77.114.239:8129/api/UsuarioApp/'+ id)
  } 

  //Obtiene las categorias asociadas a cada evento
  obtenerCategorias(){
    return this.http.get('https://164.77.114.239:8129/api/CategoriaEvento/')
  }

  //Obtiene los relatos
  obtenerRelatos(id:string){
    return this.http.get('https://164.77.114.239:8129/api/app/page/relatos/' + id)
  }

  //Obtiene datos de interes por evento
  obtenerDatosInteres(id:string){
    return this.http.get('https://164.77.114.239:8129/api/DatosInteres/' + id)
  }

  obtenerEscenario(id:string){
    return this.http.get('https://164.77.114.239:8129/api/Escenario/' + id)
  }

 // (?)
  getQuestionJson(){
    return this.http.get<any>("assets/preguntas.json");
  }

}
