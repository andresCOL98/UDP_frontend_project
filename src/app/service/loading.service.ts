import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public cargando = new BehaviorSubject<boolean>(false);

  constructor() { }

  getCargando() {
    return this.cargando.asObservable();
  }
}
