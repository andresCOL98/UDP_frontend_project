import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Asistenciaevento } from '../domain/asistenciaevento';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaeventoService {
  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getAsistenciaEventos() {
    let url = this.api + "asistencias/asistenciaevento/findAll";
    return this.httpClient.get(url);
  }

  getAsistenciaEventoById(id:number) {
    let url = this.api + "asistencias/asistenciaevento/" + id;
    return this.httpClient.get(url);
  }

  createAsistenciaEvento(asistenciaEvento:Asistenciaevento) {
    let url = this.api + "asistencias/asistenciaevento/save";
    return this.httpClient.post(url, asistenciaEvento)
  }

  updateAsistenciaEvento(asistenciaEvento:Asistenciaevento) {
    let url = this.api + "asistencias/asistenciaevento/update";
    return this.httpClient.put(url, asistenciaEvento)
  }

  deleteAsistenciaEvento(id:number) {
    let url = this.api + "asistencias/asistenciaevento/" + id;
    return this.httpClient.delete(url);
  }
}
