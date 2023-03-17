import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getRerporteInventario() {
    let url = this.api + "inventario/inventarios/reports";
    return this.httpClient.get(url);
  }

  
}
