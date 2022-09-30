import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {


  constructor(public http: HttpClient) {}

  //requestHeader = new HttpHeaders()
  //    .set('Origin', 'https://164.77.114.239:8129')

   obtenerDatos(){
    return this.http.get('https://164.77.114.239:8129/api/Eventos')
   }

  obtenerEvento(id:string){
     return this.http.get('https://164.77.114.239:8129/api/Eventos/'+ id)
  } 

  obtenerUsuario(id:string){
    return this.http.get('https://164.77.114.239:8129/api/Usuarios/'+ id)
 } 
}
