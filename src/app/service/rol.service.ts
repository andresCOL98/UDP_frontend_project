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

  getRoles(estado:boolean) {
    let url = this.api + "roles/rol/findAll";
    return this.httpClient.post(url, {estado});
  }

  getRolById(id:number) {
    let url = this.api + "roles/rol/" + id;
    return this.httpClient.get(url);
  }

  createRol(nombreR:string) {
    let url = this.api + "roles/rol/save";
    return this.httpClient.post(url, {nombre:nombreR,estado:true})
  }

  updateRol(rol:Rol) {
    let url = this.api + "roles/rol/update";
    return this.httpClient.put(url, rol)
  }

  deleteRol(id:number) {
    let url = this.api + "roles/rol/" + id;
    return this.httpClient.delete(url);
  }
}
