import { Component,Inject, OnInit  } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/domain/usuario';
import { LoginService } from 'src/app/service/login.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ForgetDataComponent } from '../forget-data/forget-data.component';

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
    private snackBar: MatSnackBar ) {}

  ngOnInit() {

    if(localStorage.getItem('rememberUser')){
      let guardado = JSON.parse(localStorage.getItem('rememberUser') || "");
      console.log(guardado);
      this.user=guardado.usuario;
      this.pass=guardado.pass;
      this.checkboxUser=guardado.check;

    }
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
    
    console.log(this.checkboxUser);
  }
  verificar() {
    this.loginService.login(this.user, this.pass).subscribe(
      (res) => {
        if(res.msj) return this.openSnackBar(res.msj, 'OK');
        this.loginService.setUserLoggedIn(res.nombre);
        this.router.navigate(['/index-menu']);
        this.recordar();
      },
      (error) => {
        this.openSnackBar(error.error.mensaje || 'Ha ocurrido un error al intentar iniciar sesion', 'OK');
      }
    );
  }
}
