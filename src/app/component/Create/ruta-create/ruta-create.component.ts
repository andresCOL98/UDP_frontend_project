import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { LoadingService } from 'src/app/service/loading.service';
import { LogService } from 'src/app/service/log.service';
import { RutaService } from 'src/app/service/ruta.service';
import { PermisoCreateComponent } from '../permiso-create/permiso-create.component';

@Component({
  selector: 'app-ruta-create',
  templateUrl: './ruta-create.component.html',
  styleUrls: ['./ruta-create.component.scss']
})
export class RutaCreateComponent {
  nombreRuta:string = '';
  user=localStorage.getItem('currentUser');

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<PermisoCreateComponent>,
    public snackBar:MatSnackBar,
    public rutaService:RutaService,
    private loading: LoadingService,
    private logService:LogService
  ) { }

  ngOnInit(): void {
    this.nombreRuta = this.data.path || '';
  }

  public openSnackBar(mesagge:string,action:string){
    this.snackBar.open(mesagge,action,{duration:3000});
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

  crearRutas() {
    if(this.nombreRuta.length < 3) return this.snackBar.open('Inserte un nombre válido', undefined, {duration: 3000});

    this.loading.cargando.next(true);

    this.rutaService.createRuta(this.nombreRuta).subscribe(data=>{
      this.openSnackBar('Ruta creada exitosamente','Exito');
      this.log("Crear Path","Usuario: " + this.user + " creó la ruta " + this.nombreRuta);
      this.dialogRef.close(true);
      this.loading.cargando.next(false);
    },error=>{
      this.log("Crear Path","Usuario: " + this.user + " falló al crear la ruta " + this.nombreRuta);
      this.snackBar.open('Ha fallado la creación de la ruta', undefined, {duration: 3000});
      this.loading.cargando.next(false);
    });
    return;
  }

  editarRuta() {
    if(this.nombreRuta.length < 3) return this.snackBar.open('Inserte un nombre válido', undefined, {duration: 3000});
    let datosRuta = {
      id: this.data.id,
      path: this.nombreRuta,
    };

    this.loading.cargando.next(true);

    this.rutaService.updateRuta(datosRuta).subscribe(res => {
      this.snackBar.open('Actualizado exitosamente', undefined, {duration: 3000});
      this.log("Editar Path","Usuario: " + this.user + " editó la ruta " + this.data.id);
      this.dialogRef.close(true);
      this.loading.cargando.next(false);
    },(error) => {
      this.log("Editar Path","Usuario: " + this.user + " falló al editar la ruta " + this.data.id);
      this.snackBar.open('Ha fallado la actualización de la ruta', undefined, {duration: 3000});
      this.loading.cargando.next(false);
    })
    return;
  }
}
