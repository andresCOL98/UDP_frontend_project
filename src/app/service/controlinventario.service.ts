import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoria } from '../domain/categoria';

@Injectable({
  providedIn: 'root'
})
export class ControlinventarioService {

  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getCategorias(estado:boolean) {
    let url = this.api + "inventario/controlInventario/findAll";
    return this.httpClient.post(url, {estado});
  }

  getCategoriaById(id:number) {
    let url = this.api + "inventario/controlInventario/" + id;
    return this.httpClient.get(url);
  }

  createCategoria(nombreC:string) {
    let url = this.api + "inventario/controlInventario/save";
    return this.httpClient.post(url, {nombre:nombreC,estado:true})
  }

  updateCategoria(categoria:Categoria) {
    let url = this.api + "inventario/controlInventario/update";
    return this.httpClient.put(url, categoria)
  }

  deleteCategoria(id:number) {
    let url = this.api + "inventario/controlInventario/" + id;
    return this.httpClient.delete(url);
  }
}
