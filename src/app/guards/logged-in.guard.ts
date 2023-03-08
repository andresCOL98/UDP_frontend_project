import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private router:Router, private loginService:LoginService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let logged:boolean = false
  
    this.loginService.getIsLogged().subscribe(res => {
      logged = res;
    });
    
    if(!logged) {
      this.router.navigate(['']);
    }
    return logged;
  }
  
}
