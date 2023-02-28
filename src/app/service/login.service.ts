import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private logged = new BehaviorSubject<boolean>(false);
  public url:string ="http://api.unipacifico.edu.co/apiunipacifico/public/api/auth/userLogin?";
  public isUserLoggedIn;
  public isAccountLoggedIn;
 
  constructor(private router: Router, public httpClient:HttpClient) {
    this.isUserLoggedIn = false;
    this.isAccountLoggedIn=false;
  }

  getIsLogged(){
    return this.logged.asObservable();
  }

  login(user:string, conta:string):Observable<any>{
    let newUrl = `${this.url}usuario=${user}&pass=${conta}`;
    let queryParams = {usuario:user,pass:conta};
    return this.httpClient.post(newUrl,{});
  }

  setUserLoggedIn(user: string) {
    this.logged.next(true);
    sessionStorage.setItem('currentUser',JSON.stringify(user));
    localStorage.setItem('currentUser',JSON.stringify(user));
    this.router.navigate(['/index-menu']);
  }

  getUserLoggedIn() {
    return JSON.parse(localStorage.getItem('currentUser') || "[]");
  }

  logOut(){
    this.logged.next(false);
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currrentUser');
    this.router.navigate(['/login']);
  }

}
