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

  getPeriodosAcademicos(activo:boolean) {
    let url = this.api + "evento/periodoacademico/findAll";
    return this.httpClient.post(url,{activo});
  }

  getPeriodoById(id:number) {
    let url = this.api + "evento/periodoacademico/" + id;
    return this.httpClient.get(url);
  }

  createPeriodo(periodoAcademico:Periodoacademico) {
    let url = this.api + "evento/periodoacademico/save";
    return this.httpClient.post(url, periodoAcademico)
  }

  updatePeriodo(periodoAcademico:Periodoacademico) {
    let url = this.api + "evento/periodoacademico/update";
    return this.httpClient.put(url, periodoAcademico)
  }

  deletePeriodo(id:number) {
    let url = this.api + "evento/periodoacademico/" + id;
    return this.httpClient.delete(url);
  }
}
