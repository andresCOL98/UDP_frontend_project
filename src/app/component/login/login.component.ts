import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/domain/usuario';
import { LoginService } from 'src/app/service/login.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: string = '';
  pass: string = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {}
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  verificar() {
    this.loginService.login(this.user, this.pass).subscribe(
      (res) => {
        if(res.msj) return this.openSnackBar(res.msj, 'OK');
        this.loginService.setUserLoggedIn(res.nombre);
        this.router.navigate(['/index-menu']);
      },
      (error) => {
        this.openSnackBar(error.error.mensaje || 'Ha ocurrido un error al intentar iniciar sesion', 'OK');
      }
    );
  }
}
