import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  public logged = new BehaviorSubject<boolean>(false);
  public idRol = new BehaviorSubject<number>(0);
  private url = environment.apiUdp;
 
  constructor(private router: Router, public httpClient:HttpClient) {}

  getIsLogged(){
    return this.logged.asObservable();
  }

  login(user:string, conta:string):Observable<any>{
 
    let queryParams = {usuario:user,pass:conta};
    return this.httpClient.post(this.url, queryParams);
  }

  setUserLoggedIn(user: string) {
    this.logged.next(true);
    sessionStorage.setItem('currentUser',JSON.stringify(user));
    localStorage.setItem('currentUser',JSON.stringify(user));
  }

  getUserLoggedIn() {
    let currentUser:any = localStorage.getItem('currentUser');
    return JSON.parse(currentUser) || "";
  }

  getUserRol(){
    let rol:any = localStorage.getItem('idRol');
    this.idRol.next(Number(rol));
    return this.idRol.asObservable();
  }

  setUserRol(rol:number) {
    localStorage.setItem('idRol', String(rol));
    this.idRol.next(rol);
  }

  logOut(){
    this.logged.next(false);
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currrentUser');
    this.router.navigate(['/login']);
  }

}
