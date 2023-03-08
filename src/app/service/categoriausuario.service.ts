import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoriausuario } from '../domain/categoriausuario';

@Injectable({
  providedIn: 'root'
})
export class CategoriausuarioService {
  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getCategoriasUsuario() {
    let url = this.api + "categoriaUsuario/findAll";
    return this.httpClient.get(url);
  }

  getCategoriaUsuarioById(id:number) {
    let url = this.api + "categoriaUsuario/" + id;
    return this.httpClient.get(url);
  }

  createCategoriaUsuario(categoriaUsuario:Categoriausuario) {
    let url = this.api + "categoriaUsuario/save";
    return this.httpClient.post(url, categoriaUsuario)
  }

  updateCategoriaUsuario(categoriaUsuario:Categoriausuario) {
    let url = this.api + "categoriaUsuario/update";
    return this.httpClient.put(url, categoriaUsuario)
  }

  deleteCategoriaUsuario(id:number) {
    let url = this.api + "categoriaUsuario/" + id;
    return this.httpClient.delete(url);
  }
}
