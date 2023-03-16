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
    let url = this.api + "evento/eventos/findAll";
    return this.httpClient.get(url);
  }

  getByFechaCategoria(fecha:string, categoria:any) {
    let url = this.api + "evento/eventos/getByFechaCategoria";

    let data = {fecha_inicio: fecha || null, subcategoria_id: categoria || null}

    return this.httpClient.post(url, data);
  }

  createEvento(evento:Evento) {
    let url = this.api + "evento/eventos/save";
    return this.httpClient.post(url, evento)
  }

  updateEvento(evento:Evento) {
    let url = this.api + "evento/eventos/update";
    return this.httpClient.put(url, evento)
  }

  deleteEvento(id:number) {
    let url = this.api + "evento/eventos/" + id;
    return this.httpClient.delete(url);
  }
}
