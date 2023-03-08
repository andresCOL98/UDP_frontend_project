import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Item } from '../domain/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getItems() {
    let url = this.api + "item/findAll";
    return this.httpClient.get(url);
  }

  getItemById(id:number) {
    let url = this.api + "item/" + id;
    return this.httpClient.get(url);
  }

  createItem(item:Item) {
    let url = this.api + "item/save";
    return this.httpClient.post(url, item)
  }

  updateItem(item:Item) {
    let url = this.api + "item/update";
    return this.httpClient.put(url, item)
  }

  deleteItem(id:number) {
    let url = this.api + "item/" + id;
    return this.httpClient.delete(url);
  }
}
