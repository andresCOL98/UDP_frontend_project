import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Periodoacademico } from '../domain/periodoacademico';

@Injectable({
  providedIn: 'root'
})
export class PeriodoacademicoService {
  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getPeriodosAcademicos() {
    let url = this.api + "periodoAcademico/findAll";
    return this.httpClient.get(url);
  }

  getPeriodoById(id:number) {
    let url = this.api + "periodoAcademico/" + id;
    return this.httpClient.get(url);
  }

  createPeriodo(periodoAcademico:Periodoacademico) {
    let url = this.api + "periodoAcademico/save";
    return this.httpClient.post(url, periodoAcademico)
  }

  updatePeriodo(periodoAcademico:Periodoacademico) {
    let url = this.api + "periodoAcademico/update";
    return this.httpClient.put(url, periodoAcademico)
  }

  deletePeriodo(id:number) {
    let url = this.api + "periodoAcademico/" + id;
    return this.httpClient.delete(url);
  }
}
