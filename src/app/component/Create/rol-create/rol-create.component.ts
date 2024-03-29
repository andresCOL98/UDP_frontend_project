import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { LoadingService } from 'src/app/service/loading.service';
import { LogService } from 'src/app/service/log.service';
import { RolService } from 'src/app/service/rol.service';

@Component({
  selector: 'app-rol-create',
  templateUrl: './rol-create.component.html',
  styleUrls: ['./rol-create.component.scss']
})
export class RolCreateComponent  implements OnInit{

  nombreRol:string = '';
  user=localStorage.getItem('currentUser');

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<RolCreateComponent>,
    private rolService: RolService,
    private snackBar: MatSnackBar,
    private loading: LoadingService,
    private logService:LogService
  ) { }

  ngOnInit(): void {
    this.nombreRol = this.data.nombre || '';
  }
  
  log(evento:string,mensaje:string){
    
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

  crearRol() {
    if(this.nombreRol.length < 4) return this.snackBar.open('Inserte un nombre válido', undefined, {duration: 3000});

    this.loading.cargando.next(true);
    this.rolService.createRol(this.nombreRol).subscribe(res => {
      this.snackBar.open('Creado exitosamente', undefined, {duration: 3000});
      this.log("Crear Rol","Usuario: "+this.user+" creó el rol " + this.nombreRol);
      this.loading.cargando.next(false);
      this.dialogRef.close(true);
    },(error) => {
      this.log("Crear Rol","Usuario: "+this.user+" fallo al crear el rol " + this.nombreRol);
      this.snackBar.open('Ha fallado la creación del rol', undefined, {duration: 3000});
      this.loading.cargando.next(false);
    });
    return;
  }

  editarRol() {
    if(this.nombreRol.length < 4) return this.snackBar.open('Inserte un nombre válido', undefined, {duration: 3000});
    let datosRol = {
      id: this.data.id,
      nombre: this.nombreRol,
      estado: this.data.estado
    };

    this.loading.cargando.next(true);

    this.rolService.updateRol(datosRol).subscribe(res => {
      this.snackBar.open('Actualizado exitosamente', undefined, {duration: 3000});
      this.log("Editar Rol","Usuario: "+this.user+" editó el rol " + this.data.id);
      this.loading.cargando.next(false);
      this.dialogRef.close(true);
    },(error) => {
      this.log("Editar Rol","Usuario: "+this.user+" falló al editar el rol " + this.data.id);
      this.snackBar.open('Ha fallado la actualización del rol', undefined, {duration: 3000});
      this.loading.cargando.next(false);
    });
    return;
  }
}

