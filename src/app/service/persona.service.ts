import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Persona } from '../domain/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getPersonas() {
    let url = this.api + "persona/findAll";
    return this.httpClient.get(url);
  }

  getPersonaById(id:number) {
    let url = this.api + "persona/" + id;
    return this.httpClient.get(url);
  }

  createPersona(persona:Persona) {
    let url = this.api + "persona/save";
    return this.httpClient.post(url, persona)
  }

  updatePersona(persona:Persona) {
    let url = this.api + "persona/update";
    return this.httpClient.put(url, persona)
  }

  deletePersona(id:number) {
    let url = this.api + "persona/" + id;
    return this.httpClient.delete(url);
  }
}
