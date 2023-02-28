import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  isLoggedUser: any;
  validation:boolean = false;
  usuario = '';


  constructor(private router: Router,
    private loginService:LoginService,
    private snackBar: MatSnackBar,
    private usuarioService:UsuarioService) { }

  ngOnInit() {
    this.usuario = this.loginService.getUserLoggedIn();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  
  cerrarSesion() {
    this.loginService.logOut();
    this.validation=false;
  }
}

 

