import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SesionServiceService } from './sesion-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private auth:SesionServiceService) { }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot){
      if(this.auth.getUserLoggedIn()){
        return true;
      }else{
        return false;
      }
    }

}
