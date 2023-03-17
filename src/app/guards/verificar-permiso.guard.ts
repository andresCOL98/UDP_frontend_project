import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class VerificarPermisoGuard implements CanActivate {
  rol:any;
  url:String;
  permisos:any;

  constructor(private loginService:LoginService, private router:Router,) {
    this.rol = this.loginService.getUserRol();
    this.permisos = JSON.parse(localStorage.getItem('permisos') || '');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.url = route.url[0].path;
    let result = this.permisos.find((res:any) => res.path == this.url);

    if(result.activo) return true;
    if(!result.activo) {
      this.loginService.logOut();
      return false;
    }
    return false;
  }
}
