import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reporte } from '../domain/reporte';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getRerporteInventario() {
    let url = this.api + "inventario/inventarios/reports";
    return url;
  }

  crearReporte(reporte:Reporte){
    let url = this.api + "reporte/reportes/save";
    return this.httpClient.post(url, reporte)
  }

  
}
