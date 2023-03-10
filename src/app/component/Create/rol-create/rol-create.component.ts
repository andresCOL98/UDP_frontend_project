import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    let tiempoTranscurrido = Date.now();
    let hoy = new Date(tiempoTranscurrido);
    
    let logg={
       id:0,
       evento:evento,
       fecha: hoy.toLocaleDateString(),
       mensaje:mensaje,
       nivel:"INFO"
    }
    this.logService.createLog(logg);
  }

  crearRol() {
    if(this.nombreRol.length < 4) return this.snackBar.open('Inserte un nombre válido', undefined, {duration: 3000});

    this.loading.cargando.next(true);
    this.rolService.createRol(this.nombreRol).subscribe(res => {
      this.snackBar.open('Creado exitosamente', undefined, {duration: 3000});
      this.log("Crear Rol","Usuario: "+this.user+" creó un rol");
      this.dialogRef.close(true);
    },(error) => {
      this.log("Crear Rol","Usuario: "+this.user+" fallo al crear un rol");
      this.snackBar.open('Ha fallado la creación del rol', undefined, {duration: 3000});
    })
    return this.loading.cargando.next(false);
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
      this.log("Editar Rol","Usuario: "+this.user+" editó un rol");

      this.dialogRef.close(true);
    },(error) => {
      this.log("Editar Rol","Usuario: "+this.user+" falló al editar un rol");
      this.snackBar.open('Ha fallado la actualización del rol', undefined, {duration: 3000});
    })
    return this.loading.cargando.next(false);
  }
}

