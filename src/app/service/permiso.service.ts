import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Permiso } from '../domain/permiso';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getPermisos() {
    let url = this.api + "permiso/findAll";
    return this.httpClient.get(url);
  }

  getPermisoById(id:number) {
    let url = this.api + "permiso/" + id;
    return this.httpClient.get(url);
  }

  createPermiso(permiso:Permiso) {
    let url = this.api + "permiso/save";
    return this.httpClient.post(url, permiso)
  }

  updatePermiso(permiso:Permiso) {
    let url = this.api + "permiso/update";
    return this.httpClient.put(url, permiso)
  }

  deletePermiso(id:number) {
    let url = this.api + "permiso/" + id;
    return this.httpClient.delete(url);
  }
}
