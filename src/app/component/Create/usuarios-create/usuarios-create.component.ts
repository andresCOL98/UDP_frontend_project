import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Usuario } from 'src/app/domain/usuario';
import { LoadingService } from 'src/app/service/loading.service';
import { LogService } from 'src/app/service/log.service';
import { RolService } from 'src/app/service/rol.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { PermisoCreateComponent } from '../permiso-create/permiso-create.component';

@Component({
  selector: 'app-usuarios-create',
  templateUrl: './usuarios-create.component.html',
  styleUrls: ['./usuarios-create.component.scss']
})
export class UsuariosCreateComponent {
  nombreRuta:string = '';
  user=localStorage.getItem('currentUser');
  rol:any;
  roles:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:Usuario,
    public dialogRef: MatDialogRef<PermisoCreateComponent>,
    public snackBar:MatSnackBar,
    public usuarioService:UsuarioService,
    private loading: LoadingService,
    private logService:LogService,
    private rolService:RolService
  ) {
    this.rol = data.rol_id || '';
  }

  ngOnInit():void {
    this.traerRoles();
  }

  log(evento:string,mensaje:string){
    let tiempoTranscurrido = Date.now();
    let hoy = new Date(tiempoTranscurrido);
    
    let logg={
       id:0,
       evento:evento,
       fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
       mensaje:mensaje,
       nivel:"INFO",
       id_usuario:Number(localStorage.getItem('idUser'))
    }
    this.logService.createLog(logg).subscribe();
  }

  traerRoles() {
    this.loading.cargando.next(true);
    this.rolService.getRoles(true).subscribe((res:any) => {
      this.roles = res;
      this.loading.cargando.next(false);
    }, (error) => {
      this.snackBar.open('Error al traer los datos de la tabla', undefined, {duration: 4000});
      this.loading.cargando.next(false);
    });
  }

  actualizarRol() {
    if(!this.rol) return this.snackBar.open('Seleccione un rol', undefined, {duration: 3000});
    this.data.rol_id = this.rol;
    this.loading.cargando.next(true);

    this.usuarioService.updateUsuario(this.data).subscribe(res => {
      this.snackBar.open('Actualizado exitosamente', undefined, {duration: 3000});
      this.log("Editar rol de usuario","Usuario: " + this.user + " editó el rol del usuario " + this.data.usuario + " poniéndole el rol " + this.data.rol_id);
      this.dialogRef.close(true);
      this.loading.cargando.next(false);
    },(error) => {
      this.log("Editar rol de usuario","Usuario: " + this.user + " falló al editar el rol del usuario " + this.data.usuario + " poniéndole " + this.data.rol_id);
      this.snackBar.open('Ha fallado la actualización del rol', undefined, {duration: 3000});
      this.loading.cargando.next(false);
    })
    return;
  }
}
