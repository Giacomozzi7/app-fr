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

  //Obtiene una categoria a partir de su id
  obtenerCategoria(id:string){
    return this.http.get('https://164.77.114.239:8129/api/CategoriaEvento/' + id)
  }

  //Obtiene los relatos
  obtenerRelatos(id:string){
    return this.http.get('https://164.77.114.239:8129/api/app/page/relatos/' + id)
  }

  //Obtiene datos de interes por evento
  obtenerDatosInteres(id:string){
    return this.http.get('https://164.77.114.239:8129/api/DatosInteres/' + id)
  }

  obtenerValoraciones(id:string){
    return this.http.get('https://164.77.114.239:8129/api/Valoracion/' + id)

  }

  obtenerGaleria(id:string){
    return this.http.get('https://164.77.114.239:8129/api/Galeria/' + id)
  }

  postGaleria(id: string,formData: FormData){
    return this.http.post('https://164.77.114.239:8129/api/galeria' + id, formData)
  }

  putValoraciones(id: string, obj){
    return this.http.put('https://164.77.114.239:8129/api/Valoracion/' + id, obj)

  }

  postValoraciones(id: string, obj){
    return this.http.post('https://164.77.114.239:8129/api/Valoracion/' + id, obj)
  }

  obtenerComentarios(id:string){
    return this.http.get('https://164.77.114.239:8129/api/Comentario/' + id)
  }

  deleteComentario(id:string, id_c:string){
    return this.http.delete('https://164.77.114.239:8129/api/Comentario/' + id + "/" + id_c)
  }

  updateComentario(id:string, obj){
    return this.http.put('https://164.77.114.239:8129/api/Comentario/' + id, obj)

  }

  obtenerEscenario(id:string){
    return this.http.get('https://164.77.114.239:8129/api/Escenario/' + id)
  }

 // (?)
  getQuestionJson(){
    return this.http.get<any>("assets/preguntas.json");
  }

  obtenerResumen(id: string){
    return this.http.get('https://164.77.114.239:8129/api/app/page/evento/' + id)
    
  }

  postComentario(id:string ,obj){
    return this.http.post('https://164.77.114.239:8129/api/Comentario/' + id, obj)
  }

}
