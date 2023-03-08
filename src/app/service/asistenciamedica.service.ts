import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Asistenciamedica } from '../domain/asistenciamedica';
import { Categoria } from '../domain/categoria';

@Injectable({
  providedIn: 'root'
})
export class AsistenciamedicaService {
  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getAsistenciasMedicas() {
    let url = this.api + "asistenciaMedica/findAll";
    return this.httpClient.get(url);
  }

  getAsistenciaMedicaById(id:number) {
    let url = this.api + "asistenciaMedica/" + id;
    return this.httpClient.get(url);
  }

  createAsistenciaMedica(asistenciaMedica:Asistenciamedica) {
    let url = this.api + "asistenciaMedica/save";
    return this.httpClient.post(url, asistenciaMedica)
  }

  updateAsistenciaMedica(asistenciaMedica:Asistenciamedica) {
    let url = this.api + "asistenciaMedica/update";
    return this.httpClient.put(url, asistenciaMedica)
  }

  deleteAsistenciaMedica(id:number) {
    let url = this.api + "asistenciaMedica/" + id;
    return this.httpClient.delete(url);
  }
}
