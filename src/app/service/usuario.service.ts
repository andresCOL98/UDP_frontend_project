import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getUsuarios() {
    let url = this.api + "usuario/findAll";
    return this.httpClient.get(url);
  }

  getByUsuario(user:string) {
    let url = this.api + "usuario/" + user;
    return this.httpClient.get(url);
  }

  getUsuarioById(id:number) {
    let url = this.api + "usuario/" + id;
    return this.httpClient.get(url);
  }

  createUsuario(usuario:Usuario) {
    let url = this.api + "persona/usuario/save";
    return this.httpClient.post(url, usuario)
  }

  updateUsuario(usuario:Usuario) {
    let url = this.api + "usuario/update";
    return this.httpClient.put(url, usuario)
  }

  deleteUsuario(id:number) {
    let url = this.api + "usuario/" + id;
    return this.httpClient.delete(url);
  }
}
