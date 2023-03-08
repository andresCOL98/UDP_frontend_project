import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Inventarioitem } from '../domain/inventarioitem';

@Injectable({
  providedIn: 'root'
})
export class InventaroitemService {
  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getInventarioItem() {
    let url = this.api + "inventarioItem/findAll";
    return this.httpClient.get(url);
  }

  getInventarioItemById(id:number) {
    let url = this.api + "inventarioItem/" + id;
    return this.httpClient.get(url);
  }

  createInventarioItem(inventarioItem:Inventarioitem) {
    let url = this.api + "inventarioItem/save";
    return this.httpClient.post(url, inventarioItem)
  }

  updateInventarioItem(inventarioItem:Inventarioitem) {
    let url = this.api + "inventarioItem/update";
    return this.httpClient.put(url, inventarioItem)
  }

  deleteInventarioItem(id:number) {
    let url = this.api + "inventarioItem/" + id;
    return this.httpClient.delete(url);
  }
}
