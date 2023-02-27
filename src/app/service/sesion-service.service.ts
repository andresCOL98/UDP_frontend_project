import { Injectable } from '@angular/core';
import { Usuario } from '../domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class SesionServiceService {

  public isUserLoggedIn;
  public isAccountLoggedIn;
 
  constructor() {
    this.isUserLoggedIn = false;
    this.isAccountLoggedIn=false;
  }

  setUserLoggedIn(user: string) {
    this.isUserLoggedIn = true;
    sessionStorage.setItem('currentUser',JSON.stringify(user));
    localStorage.setItem('currentUser',JSON.stringify(user));
    
  }

  
  getUserLoggedIn() {
    console.log(sessionStorage.getItem('currentUser'));
    return JSON.parse(localStorage.getItem('currentUser') || "[]");
  }

 

  logOut(){
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currrentUser');
  }

  
}
