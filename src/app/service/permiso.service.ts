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
    let url = this.api + "roles/permisos/findAll";
    return this.httpClient.get(url);
  }

  getPermisoByRol(rol_id:number) {
    let url = this.api + "roles/permisos/getByRol";
    return this.httpClient.post(url, {rol_id});
  }

  createPermiso(permiso:Permiso) {
    let url = this.api + "roles/permisos/save";
    return this.httpClient.post(url, permiso)
  }

  updatePermiso(permiso:Permiso) {
    let url = this.api + "roles/permisos/update";
    return this.httpClient.put(url, permiso)
  }

  deletePermiso(permiso:Permiso) {
    let url = this.api + "roles/permisos/delete";
    return this.httpClient.post(url, permiso);
  }
}
