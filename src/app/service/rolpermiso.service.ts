import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rolpermiso } from '../domain/rolpermiso';

@Injectable({
  providedIn: 'root'
})
export class RolpermisoService {
  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getRolPermisos() {
    let url = this.api + "rolPermiso/findAll";
    return this.httpClient.get(url);
  }

  getRolPermisoById(id:number) {
    let url = this.api + "rolPermiso/" + id;
    return this.httpClient.get(url);
  }

  createRolPermiso(permiso:Rolpermiso) {
    let url = this.api + "rolPermiso/save";
    return this.httpClient.post(url, permiso)
  }

  updateRolPermiso(permiso:Rolpermiso) {
    let url = this.api + "rolPermiso/update";
    return this.httpClient.put(url, permiso)
  }

  deleteRolPermiso(id:number) {
    let url = this.api + "rolPermiso/" + id;
    return this.httpClient.delete(url);
  }
}
