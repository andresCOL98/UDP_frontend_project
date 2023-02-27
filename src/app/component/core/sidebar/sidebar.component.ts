import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import { SesionServiceService } from 'src/app/service/sesion-service.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  isLoggedUser: any;
  validation:boolean=false;
  prueba:any;


  constructor(private router: Router,
    private loginService:LoginService,
    private sesionService:SesionServiceService,
    private snackBar: MatSnackBar,
    private usuarioService:UsuarioService) { }

  ngOnInit() {
    this.validarSesion();
    this.loginService.getLogged().subscribe(res=>{console.log({logged:res})});
    
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  validarSesion(){
    this.isLoggedUser = sessionStorage.getItem('currentUser');

    if (sessionStorage.getItem('currentUser')) {
      this.validation = true;
    } else {
      this.validation = false;
    }
    console.log(this.validation);
  }
  
  cerrarSesion() {
    this.sesionService.logOut();
    this.validation=false;
  }
}

 

