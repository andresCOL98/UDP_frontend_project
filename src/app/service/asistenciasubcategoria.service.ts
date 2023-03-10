import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Asistenciasubcategoria } from '../domain/asistenciasubcategoria';

@Injectable({
  providedIn: 'root'
})
export class AsistenciasubcategoriaService {
  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getAsistenciaSubcategorias() {
    let url = this.api + "asistenciaSubcategoria/findAll";
    return this.httpClient.get(url);
  }

  getAsistenciaSubcategoriaById(id:number) {
    let url = this.api + "asistenciaSubcategoria/" + id;
    return this.httpClient.get(url);
  }

  createAsistenciaSubcategoria(formulario:Asistenciasubcategoria) {
    let url = this.api + "asistenciaSubcategoria/save";
    return this.httpClient.post(url, formulario)
  }

  updateAsistenciaSubcategoria(formulario:Asistenciasubcategoria) {
    let url = this.api + "asistenciaSubcategoria/update";
    return this.httpClient.put(url, formulario)
  }

  deleteAsistenciaSubcategoria(id:number) {
    let url = this.api + "asistenciaSubcategoria/" + id;
    return this.httpClient.delete(url);
  }
}
