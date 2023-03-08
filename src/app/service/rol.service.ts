import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rol } from '../domain/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getRoles() {
    let url = this.api + "rol/findAll";
    return this.httpClient.get(url);
  }

  getRolById(id:number) {
    let url = this.api + "rol/" + id;
    return this.httpClient.get(url);
  }

  createRol(rol:Rol) {
    let url = this.api + "rol/save";
    return this.httpClient.post(url, rol)
  }

  updateRol(rol:Rol) {
    let url = this.api + "rol/update";
    return this.httpClient.put(url, rol)
  }

  deleteRol(id:number) {
    let url = this.api + "rol/" + id;
    return this.httpClient.delete(url);
  }
}
