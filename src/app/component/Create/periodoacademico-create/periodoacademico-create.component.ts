import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { LoadingService } from 'src/app/service/loading.service';
import { LogService } from 'src/app/service/log.service';
import { PeriodoacademicoService } from 'src/app/service/periodoacademico.service';

@Component({
  selector: 'app-periodoacademico-create',
  templateUrl: './periodoacademico-create.component.html',
  styleUrls: ['./periodoacademico-create.component.scss']
})
export class PeriodoacademicoCreateComponent implements OnInit{

  nombrePeriodo:number = 0;
  anio:number=0;
  estado:boolean=true; 
  user=localStorage.getItem('currentUser');
  anioActual = new Date().getFullYear();

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<PeriodoacademicoCreateComponent>,
    private periodoService: PeriodoacademicoService,
    private snackBar: MatSnackBar,
    private loading: LoadingService,
    private logService:LogService
  ) { }

  ngOnInit(): void {
    this.nombrePeriodo = this.data.periodo || '';
    this.anio=this.data.anio || '';
  }

  crearPeriodo() {
    if(this.nombrePeriodo < 0 || this.nombrePeriodo > 3) return this.snackBar.open('Inserte un periodo válido', undefined, {duration: 3000});
    if(this.anio < this.anioActual) return this.snackBar.open('Inserte un año válido', undefined, {duration: 3000});

    let datosPeriodo={
      id: this.data.id,
      periodo: this.nombrePeriodo,
      anio:this.anio,
      activo:true
    };

    this.loading.cargando.next(true);

    this.periodoService.createPeriodo(datosPeriodo).subscribe(res => {
      this.snackBar.open('Creado exitosamente', undefined, {duration: 3000});
      this.log("Crear periodo academico","Usuario: " + this.user + " creó el periodo " + this.nombrePeriodo);
      this.dialogRef.close(true);
    },(error) => {
      this.snackBar.open('Ha fallado la creación del periodo', undefined, {duration: 3000});
      this.log("Crear periodo academico","Usuario: " + this.user + " falló al crear el periodo " + this.nombrePeriodo);
    });

    return this.loading.cargando.next(false);
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

  editarPeriodo() {
    if(this.nombrePeriodo < 0 || this.nombrePeriodo > 3) return this.snackBar.open('Inserte un periodo válido', undefined, {duration: 3000});
    if(this.anio < this.anioActual) return this.snackBar.open('Inserte un año válido', undefined, {duration: 3000});

    let datosPeriodo={
      id: this.data.id,
      periodo: this.nombrePeriodo,
      anio:this.anio,
      activo:this.data.activo

    };

    this.loading.cargando.next(true);

    this.periodoService.updatePeriodo(datosPeriodo).subscribe(res => {
      this.snackBar.open('Actualizado exitosamente', undefined, {duration: 3000});
      this.log("Editar periodo academico","Usuario: " + this.user + " editó el periodo academico " + this.data.id);
      this.loading.cargando.next(false);
      this.dialogRef.close(true);
    },(error) => {
      this.log("Editar periodo academico","Usuario: " + this.user + " falló al editar el periodo academico " + this.data.id);
      this.loading.cargando.next(false);
      this.snackBar.open('Ha fallado la actualización del periodo', undefined, {duration: 3000});
    });
    return;
  }
}

