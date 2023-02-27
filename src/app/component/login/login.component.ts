import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/domain/usuario';
import { LoginService } from 'src/app/service/login.service';
import { SesionServiceService } from 'src/app/service/sesion-service.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  /*
  usuario:Usuario=new Usuario(0,"","",0);

  c:number=0;


  constructor(private router: Router,
    private loginService:LoginService,
    private sesionService:SesionServiceService,
    private snackBar: MatSnackBar,
    private usuarioService:UsuarioService) { }

  ngOnInit() {
    
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  verificar() {
    
    this.router.navigate(['index-menu']);
     
    this.loginService.login(this.usuario).subscribe(

      res => {
        this.sesionService.setUserLoggedIn(this.usuario);
          this.router.navigate(['index-menu']);
      },
      error => {
        this.c++;
        console.error("h"+this.c);
       
        
        this.openSnackBar(error.error.mensaje,"ERROR");
        
        }

        );}


  */

}
