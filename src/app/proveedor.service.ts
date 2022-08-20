import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(public http: HttpClient) {}

   obtenerDatos(){
    return this.http.get('https://localhost:44373/api/Marcadores')
   }

  obtenerEvento(id:string){
     return this.http.get('https://localhost:44373/api/Marcadores/'+ id)
  } 
}
