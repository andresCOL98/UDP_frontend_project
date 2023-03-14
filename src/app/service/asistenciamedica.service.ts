import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Asistenciamedica } from '../domain/asistenciamedica';

@Injectable({
  providedIn: 'root'
})
export class AsistenciamedicaService {
  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getAsistenciasMedicas() {
    let url = this.api + "asistencias/asistenciamedica/findAll";
    return this.httpClient.get(url);
  }

  findByFecha(fecha:string) {
    let url = this.api + "asistencias/asistenciamedica/findByFecha";
    return this.httpClient.post(url, {fecha});
  }

  findByIdPege(id_pege:any) {
    let url = this.api + "asistencias/asistenciamedica/findByIdPege";
    return this.httpClient.post(url, {id_pege});
  }

  findByIdPegeAndFecha(fecha:string, id_pege:any) {
    let url = this.api + "asistencias/asistenciamedica/findByIdPegeAndFecha";
    return this.httpClient.post(url, {fecha, id_pege});
  }

  createAsistenciaMedica(asistenciaMedica:Asistenciamedica) {
    let url = this.api + "asistencias/asistenciamedica/save";
    return this.httpClient.post(url, asistenciaMedica)
  }

  updateAsistenciaMedica(asistenciaMedica:Asistenciamedica) {
    let url = this.api + "asistencias/asistenciamedica/update";
    return this.httpClient.put(url, asistenciaMedica)
  }

  deleteAsistenciaMedica(id:number) {
    let url = this.api + "asistencias/asistenciamedica/" + id;
    return this.httpClient.delete(url);
  }
}
