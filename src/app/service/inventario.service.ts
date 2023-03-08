import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Inventario } from '../domain/inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getInventario() {
    let url = this.api + "inventario/findAll";
    return this.httpClient.get(url);
  }

  getInventarioById(id:number) {
    let url = this.api + "inventario/" + id;
    return this.httpClient.get(url);
  }

  createInventario(inventario:Inventario) {
    let url = this.api + "inventario/save";
    return this.httpClient.post(url, inventario)
  }

  updateInventario(inventario:Inventario) {
    let url = this.api + "inventario/update";
    return this.httpClient.put(url, inventario)
  }

  deleteInventario(id:number) {
    let url = this.api + "inventario/" + id;
    return this.httpClient.delete(url);
  }
}
