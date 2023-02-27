import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private logged = new Subject<boolean>();

  constructor() { }

  loggear(accion:boolean) {
    this.logged.next(accion);
  }

  isLogged(): Observable<boolean> {
    return this.logged.asObservable();
  }
}
