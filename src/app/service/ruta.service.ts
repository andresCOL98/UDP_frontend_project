import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ruta } from '../domain/ruta';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getRutas() {
    let url = this.api + "roles/rutas/findAll";
    return this.httpClient.get(url);
  }

  getRutaById(id:number) {
    let url = this.api + "roles/rutas/" + id;
    return this.httpClient.get(url);
  }

  createRuta(path:string) {
    let url = this.api + "roles/rutas/save";
    return this.httpClient.post(url, {path})
  }

  updateRuta(ruta:Ruta) {
    let url = this.api + "roles/rutas/update";
    return this.httpClient.put(url, ruta)
  }

  deleteRuta(id:number) {
    let url = this.api + "roles/rutas/" + id;
    return this.httpClient.delete(url);
  }
}
