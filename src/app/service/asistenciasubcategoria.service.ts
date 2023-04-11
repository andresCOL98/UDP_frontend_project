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
    let url = this.api + "asistencias/asistenciasubcategoria/findAll";
    return this.httpClient.get(url);
  }

  getAsistenciaSubcategoriaById(id:number) {
    let url = this.api + "asistencias/asistenciasubcategoria/" + id;
    return this.httpClient.get(url);
  }

  createAsistenciaSubcategoria(formulario:Asistenciasubcategoria) {
    let url = this.api + "asistencias/asistenciasubcategoria/save";
    return this.httpClient.post(url, formulario)
  }

  updateAsistenciaSubcategoria(formulario:Asistenciasubcategoria) {
    let url = this.api + "asistencias/asistenciasubcategoria/update";
    return this.httpClient.put(url, formulario)
  }

  deleteAsistenciaSubcategoria(id:number) {
    let url = this.api + "asistencias/asistenciasubcategoria/" + id;
    return this.httpClient.delete(url);
  }

  reporte(fecha_inicio:string,fecha_fin:string,periodo_academico_id:number,subcategoria_id:number) {
    let url = this.api + "asistencias/asistenciasubcategoria/findByFechaCategoriaPeriodo" ;
    return this.httpClient.post(url,{fecha_inicio,fecha_fin,periodo_academico_id,subcategoria_id});
  }
}
