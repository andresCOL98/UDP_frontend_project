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
  u: Usuario = new Usuario(0, '', '', 0);
  user: string = '';
  pass: string = '';
  c: number = 0;

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
        this.loginService.setUserLoggedIn(this.user);
      },
      (error) => {
        this.openSnackBar(error.error.mensaje, 'ERROR');
      }
    );
  }
}
