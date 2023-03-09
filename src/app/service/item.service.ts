import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Inventario } from '../domain/inventario';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getItems(estado:boolean) {
    let url = this.api + "inventario/inventarios/findAll";
    return this.httpClient.post(url,{estado});
  }

  getItemById(id:number) {
    let url = this.api + "inventario/inventarios/" + id;
    return this.httpClient.get(url);
  }

  createItem(item:Inventario) {
    let url = this.api + "inventario/inventarios/save";
    return this.httpClient.post(url, item)
  }

  updateItem(item:Inventario) {
    let url = this.api + "inventario/inventarios/update";
    return this.httpClient.put(url, item)
  }

  deleteItem(id:number) {
    let url = this.api + "inventario/inventarios/" + id;
    return this.httpClient.delete(url);
  }
}
