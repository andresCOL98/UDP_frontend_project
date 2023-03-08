import { Component, HostListener } from '@angular/core';
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
  usuario = '';
  open = true;

  constructor(private loginService:LoginService) { }

  ngOnInit() {
    this.usuario = this.loginService.getUserLoggedIn();
    this.onWindowResize();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if(window.innerWidth < 768) {
      this.open = false;
    } else {
      this.open = true;
    }
  }
  
  cerrarSesion() {
    this.loginService.logOut();
  }
}

 

