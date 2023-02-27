import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /*
  private logged = new Subject<boolean>();

  public url:string ="";
  constructor(public httpClient:HttpClient) { }


  login(usuario:Usuario):Observable<any>{
    return this.httpClient.post(this.url,usuario);
  }
*/
}
