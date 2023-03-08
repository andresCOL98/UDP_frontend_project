import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Evento } from '../domain/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getEventos() {
    let url = this.api + "evento/findAll";
    return this.httpClient.get(url);
  }

  getEventoById(id:number) {
    let url = this.api + "evento/" + id;
    return this.httpClient.get(url);
  }

  createEvento(evento:Evento) {
    let url = this.api + "evento/save";
    return this.httpClient.post(url, evento)
  }

  updateEvento(evento:Evento) {
    let url = this.api + "evento/update";
    return this.httpClient.put(url, evento)
  }

  deleteEvento(id:number) {
    let url = this.api + "evento/" + id;
    return this.httpClient.delete(url);
  }
}
