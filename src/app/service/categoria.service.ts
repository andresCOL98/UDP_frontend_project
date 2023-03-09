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

  getCategorias() {
    let url = this.api + "categoria/findAll";
    return this.httpClient.get(url);
  }

  getCategoriaById(id:number) {
    let url = this.api + "categoria/" + id;
    return this.httpClient.get(url);
  }

  createCategoria(nombre:string) {
    let url = this.api + "categoria/save";
    return this.httpClient.post(url, {nombre})
  }

  updateCategoria(categoria:Categoria) {
    let url = this.api + "categoria/update";
    return this.httpClient.put(url, categoria)
  }

  deleteCategoria(id:number) {
    let url = this.api + "categoria/" + id;
    return this.httpClient.delete(url);
  }
}
