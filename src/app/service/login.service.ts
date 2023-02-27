import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private logged = new Subject<boolean>();
 

  public url:string ="http://api.unipacifico.edu.co/apiunipacifico/public/api/auth/userLogin?";

  constructor(public httpClient:HttpClient)  { }

  getLogged(){
    this.logged.next(false);
    return this.logged.asObservable();
  }

  login(user:string, conta:string):Observable<any>{

    let newUrl = `${this.url}usuario=${user}&pass=${conta}`;

    let queryParams = {usuario:user,pass:conta};

    
    return this.httpClient.post(newUrl,"");
    

  }

}
