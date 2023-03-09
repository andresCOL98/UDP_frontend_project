import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoria } from '../domain/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getCategorias(estado:boolean) {
    let url = this.api + "categorias/categoria/findAll";
    return this.httpClient.post(url, {estado});
  }

  getCategoriaById(id:number) {
    let url = this.api + "categoria/" + id;
    return this.httpClient.get(url);
  }

  createCategoria(nombreC:string) {
    let url = this.api + "categorias/categoria/save";
    return this.httpClient.post(url, {nombre:nombreC,estado:true})
  }

  updateCategoria(categoria:Categoria) {
    let url = this.api + "categorias/categoria/update";
    return this.httpClient.put(url, categoria)
  }

  deleteCategoria(id:number) {
    let url = this.api + "categoria/" + id;
    return this.httpClient.delete(url);
  }
}
