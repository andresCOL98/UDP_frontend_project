import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from 'src/app/service/loading.service';
import { LogService } from 'src/app/service/log.service';
import { RutaService } from 'src/app/service/ruta.service';

@Component({
  selector: 'app-permiso-create',
  templateUrl: './permiso-create.component.html',
  styleUrls: ['./permiso-create.component.scss']
})
export class PermisoCreateComponent implements OnInit  {
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

  crearRutas() {
    if(this.nombreRuta.length < 3) return this.snackBar.open('Inserte un nombre válido', undefined, {duration: 3000});

    this.loading.cargando.next(true);

    this.rutaService.createRuta(this.nombreRuta).subscribe(data=>{
      this.openSnackBar('Ruta creada exitosamente','Exito');
      this.log("Crear Path","Usuario: " + this.user + " creó la ruta " + this.nombreRuta);
      this.dialogRef.close(true);
    },error=>{
      this.log("Crear Path","Usuario: " + this.user + " falló al crear la ruta " + this.nombreRuta);

      this.snackBar.open('Ha fallado la creación de la ruta', undefined, {duration: 3000});
    });

    return this.loading.cargando.next(false);
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
    },(error) => {
      this.log("Editar Path","Usuario: " + this.user + " falló al editar la ruta " + this.data.id);
      this.snackBar.open('Ha fallado la actualización de la ruta', undefined, {duration: 3000});
    })
    return this.loading.cargando.next(false);
  }
}



