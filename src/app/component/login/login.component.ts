import { Component,Inject, OnInit  } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/domain/usuario';
import { LoginService } from 'src/app/service/login.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ForgetDataComponent } from '../forget-data/forget-data.component';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: string = '';
  pass: string = '';
  checkboxUser:boolean=false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService ) {}

  ngOnInit() {
    if(localStorage.getItem('rememberUser')){
      let guardado = JSON.parse(localStorage.getItem('rememberUser') || "");
      this.user=guardado.usuario;
      this.pass=guardado.pass;
      this.checkboxUser=guardado.check;
    }
    this.currentUser();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  abrirForm() {
    let dialogRef = this.dialog.open(ForgetDataComponent, {
      width: '400px',
      height: 'max-content',
      autoFocus: false,
      data: {}
    });
  }

  recordar(){
    if(this.checkboxUser==true){
      let recordarUser = {usuario:this.user,pass:this.pass,check:this.checkboxUser};
      localStorage.setItem('rememberUser',JSON.stringify(recordarUser));
    }else{
      localStorage.removeItem('rememberUser');
    }
  }

  currentUser(){
    if(localStorage.getItem('currentUser')){
      this.router.navigate(['/index-menu']);
    }else{
      this.router.navigate(['/login']);
    }
  }

  verificar() {
    this.loadingService.cargando.next(true);

    this.loginService.login(this.user, this.pass).subscribe(
      (res) => {
        this.loadingService.cargando.next(false);
        if(res.msj) return this.openSnackBar(res.msj, 'OK');
        this.loginService.setUserLoggedIn(res.nombre);
        this.router.navigate(['/index-menu']);
        this.recordar();
      },
      (error) => {
        this.loadingService.cargando.next(false);
        this.openSnackBar('Ha ocurrido un error al intentar iniciar sesion', 'OK');
      }
    );
  }
}
