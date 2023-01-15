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
    return this.http.get('https://www.vjs.cl:8129/api/app/page/mappins')
  }

  
  obtenerEvento(id:string){
    return this.http.get('https://www.vjs.cl:8129/api/Eventos/'+ id)
  } 

 
  obtenerUsuario(id:string){
    return this.http.get('https://www.vjs.cl:8129/api/UsuarioApp/'+ id)
  } 

  // CATEGORIAS----------------
  obtenerCategorias(){
    return this.http.get('https://www.vjs.cl:8129/api/CategoriaEvento/')
  }

  obtenerCategoria(id:string){
    return this.http.get('https://www.vjs.cl:8129/api/CategoriaEvento/' + id)
  }
  //---------------------------


  // RELATOS----------------
  obtenerRelatos(id:string){
    return this.http.get('https://www.vjs.cl:8129/api/Relato/' + id)
  }

  postRelato(id: string, formData: FormData){
    return this.http.post('https://www.vjs.cl:8129/api/Relato/' + id, formData )
  }

  putRelato(id: string, formData: FormData){
    return this.http.put('https://www.vjs.cl:8129/api/Relato/' + id, formData)
  }

  deleteRelato(id:string, id_r:string){
    return this.http.delete('https://www.vjs.cl:8129/api/Relato/' + id + "/" + id_r)
  }
  //---------------------------


  //DATO INTERES----------------
  obtenerDatosInteres(id:string){
    return this.http.get('https://www.vjs.cl:8129/api/DatosInteres/' + id)
  }
  //---------------------------


  //VALORACIONES----------------
  obtenerValoraciones(id:string){
    return this.http.get('https://www.vjs.cl:8129/api/Valoracion/' + id)
  }

  putValoraciones(id: string, obj){
    return this.http.put('https://www.vjs.cl:8129/api/Valoracion/' + id, obj)

  }

  postValoraciones(id: string, obj){
    return this.http.post('https://www.vjs.cl:8129/api/Valoracion/' + id, obj)
  }


  //GALERIA----------------
  obtenerGaleria(id:string){
    return this.http.get('https://www.vjs.cl:8129/api/Galeria/' + id)
  }

  postGaleria(categoria: string,id: string,formData: FormData){
    console.log(id)
    return this.http.post('https://www.vjs.cl:8129/api/galeria/' + categoria + '/' + id, formData)
  }

  putGaleria(categoria: string,id: string, formData: FormData){
    return this.http.put('https://www.vjs.cl:8129/api/Galeria/' + categoria + '/' + id, formData)
  }

  deleteGaleria(categoria: string, id:string, formData:string){
    return this.http.delete('https://www.vjs.cl:8129/api/Galeria/' + categoria + '/' + id + "/" + formData)
  }



  
  //COMENTARIOS----------------
  obtenerComentarios(id:string){
    return this.http.get('https://www.vjs.cl:8129/api/Comentario/' + id)
  }

  deleteComentario(id:string, id_c:string){
    return this.http.delete('https://www.vjs.cl:8129/api/Comentario/' + id + "/" + id_c)
  }

  updateComentario(id:string, obj){
    return this.http.put('https://www.vjs.cl:8129/api/Comentario/' + id, obj)
  }

  postComentario(id:string ,obj){
    return this.http.post('https://www.vjs.cl:8129/api/Comentario/' + id, obj)
  }



  //LIKES----------------
  postLike(tipoData: string,id_com: string ,id_user:string){
    return this.http.post('https://www.vjs.cl:8129/api/'+ tipoData +'/like/' + id_com + '/' + id_user,'')
  }

  deleteLike(tipoData: string,id_com: string ,id_user:string){
    return this.http.delete('https://www.vjs.cl:8129/api/' + tipoData + '/dlike/' + id_com + '/' + id_user)
  }


  //VISITAS----------------
  postVisita(id:string, obj){
    return this.http.post('https://www.vjs.cl:8129/api/Visita/' + id, obj)
  }

  //TOP 10
  obtenerTop(){
    return this.http.get('https://vjs.cl:8134/api/app/page/top?top=10')
  }

  //Obtener destacados
  obtenerDestacados(){
    return this.http.get('https://vjs.cl:8134/api/Galeria/top?t=7')

  }

  obtenerEscenario(id:string){
    return this.http.get('https://www.vjs.cl:8129/api/Escenario/' + id)
  }

  obtenerEscenarios(){
    return this.http.get('https://www.vjs.cl:8129/api/Escenario')
  }

 // Obtener preguntas trivia
  obtenerPreguntas(){
    return this.http.get("https://vjs.cl:8129/api/moduloeducativo");
  }
  obtenerTarjetas(){
    return this.http.get("https://www.vjs.cl:8134/api/InfoModuloEducativo/all")
  }

  obtenerRanking(){
    return this.http.get('/assets/ranking.json')
  }

  obtenerResumen(id: string){
    return this.http.get('https://www.vjs.cl:8129/api/app/page/evento/' + id)
    
  }

  

}
