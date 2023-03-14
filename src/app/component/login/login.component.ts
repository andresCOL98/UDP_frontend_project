import { Component,Inject, OnInit  } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ForgetDataComponent } from '../forget-data/forget-data.component';
import { LoadingService } from 'src/app/service/loading.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { LogService } from 'src/app/service/log.service';
import { Usuario } from 'src/app/domain/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: string = '';
  pass: string = '';
  checkboxUser:boolean=false;
  validarUser:boolean=false;

  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService,
    private usuarioService:UsuarioService,
    private logService:LogService ) {}

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

  validarUsuario(dataUdp:any){
    let datos:Usuario = {
      id: 0,
      id_pege: dataUdp.idpege,
      id_usuario: dataUdp.idusuario,
      usuario: dataUdp.usuario,
      nombre: dataUdp.nombre,
      documento: dataUdp.documento,
      cargo: dataUdp.cargo,
      rol_id: 0,
      categoria_id: 0,
      estado: 1
    }
    this.usuarioService.getByUsuario(this.user).subscribe((res:any) => {
      if(res == "Usuario no encontrado") {
        this.crearUsuario(datos);
      } else if(res.id) {
        datos.id = res.id;
        this.actualizarUsuario(datos);
      }
    });
  }

  crearUsuario(datos:Usuario) {
    this.usuarioService.createUsuario(datos).subscribe(res => {
      this.openSnackBar('Usuario creado', 'Ok');
    }, (error) => {
      this.openSnackBar('Error al crear usuario', 'Ok');
    })
  }

  actualizarUsuario(datos:Usuario) {
    this.usuarioService.updateUsuario(datos).subscribe(res => {
      this.openSnackBar('Datos actualizados', 'Ok');
    }, (error) => {
      this.openSnackBar('Error al actualizar usuario', 'Ok');
    })
  }

  log(){
    let logg={
       id:0,
       evento:"Iniciar Sesion",
       fecha: this.hoy.toLocaleDateString(),
       mensaje:"Usuario: "+this.user+" inicio sesión.",
       nivel:"INFO"
    }
    this.logService.createLog(logg);
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
        this.validarUsuario(res);
        this.log();
      },
      (error) => {
        this.loadingService.cargando.next(false);
        this.openSnackBar('Ha ocurrido un error al intentar iniciar sesion', 'OK');
      }
    );
  }
}
