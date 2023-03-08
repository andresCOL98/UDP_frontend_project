import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subcategoria } from '../domain/subcategoria';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {
  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getSubCategorias() {
    let url = this.api + "subCategoria/findAll";
    return this.httpClient.get(url);
  }

  getSubCategoriaById(id:number) {
    let url = this.api + "subCategoria/" + id;
    return this.httpClient.get(url);
  }

  createSubCategoria(subCategoria:Subcategoria) {
    let url = this.api + "subCategoria/save";
    return this.httpClient.post(url, subCategoria)
  }

  updateSubCategoria(subCategoria:Subcategoria) {
    let url = this.api + "subCategoria/update";
    return this.httpClient.put(url, subCategoria)
  }

  deleteSubCategoria(id:number) {
    let url = this.api + "subCategoria/" + id;
    return this.httpClient.delete(url);
  }
}
