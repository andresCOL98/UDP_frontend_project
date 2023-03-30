import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Controlinventario } from '../domain/controlinventario';

@Injectable({
  providedIn: 'root'
})
export class ControlinventarioService {

  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getInventarios(estado:boolean) {
    let url = this.api + "inventario/controlInventario/findAll";
    return this.httpClient.post(url, {estado});
  }

  getInventarioByItem(id:number) {
    let url = this.api + "inventario/inventarios/findById";
    return this.httpClient.post(url, {id});
  }

  createInventario(registro:Controlinventario) {
    let url = this.api + "inventario/controlInventario/save";
    return this.httpClient.post(url, registro)
  }

  updateInventario(registro:Controlinventario) {
    let url = this.api + "inventario/controlInventario/update";
    return this.httpClient.put(url, registro)
  }

  deleteInventario(id:number) {
    let url = this.api + "inventario/controlInventario/" + id;
    return this.httpClient.delete(url);
  }
}
