import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    if(this.nombrePeriodo < 0 || this.nombrePeriodo > 3) return this.snackBar.open('Inserte un período válido', undefined, {duration: 3000});
    if(this.anio < 2023) return this.snackBar.open('Inserte un año válido', undefined, {duration: 3000});

    let datosPeriodo={
      id: this.data.id,
      periodo: this.nombrePeriodo,
      anio:this.anio,
      activo:true

    };

    this.loading.cargando.next(true);
    this.periodoService.createPeriodo(datosPeriodo).subscribe(res => {
      this.snackBar.open('Creado exitosamente', undefined, {duration: 3000});
      this.log("Crear período academico","Usuario: "+this.user+" creó un período academico");
      this.dialogRef.close(true);
    },(error) => {
      this.snackBar.open('Ha fallado la creación del período', undefined, {duration: 3000});
      this.log("Crear período academico","Usuario: "+this.user+" falló al crear un período academico");

    })
    return this.loading.cargando.next(false);
  }

  log(evento:string,mensaje:string){
    let tiempoTranscurrido = Date.now();
    let hoy = new Date(tiempoTranscurrido);
    let user=localStorage.getItem('currentUser');
    let logg={
       id:0,
       evento:evento,
       fecha: hoy.toLocaleDateString(),
       mensaje:mensaje,
       nivel:"INFO"
    }
    this.logService.createLog(logg).subscribe(
      (res) => {

      },
      (error) => {
      }
    );
  }
  editarPeriodo() {
    if(this.nombrePeriodo < 0 || this.nombrePeriodo > 3) return this.snackBar.open('Inserte un período válido', undefined, {duration: 3000});
    if(this.anio < 2023) return this.snackBar.open('Inserte un año válido', undefined, {duration: 3000});
    let datosPeriodo={
      id: this.data.id,
      periodo: this.nombrePeriodo,
      anio:this.anio,
      activo:this.data.activo

    };
    this.loading.cargando.next(true);

    this.periodoService.updatePeriodo(datosPeriodo).subscribe(res => {
      this.snackBar.open('Actualizado exitosamente', undefined, {duration: 3000});
      this.log("Editar período academico","Usuario: "+this.user+" editó un período academico");

      this.dialogRef.close(true);
    },(error) => {
      this.log("Editar período academico","Usuario: "+this.user+" falló al editar un período academico");

      this.snackBar.open('Ha fallado la actualización del período', undefined, {duration: 3000});
    })
    return this.loading.cargando.next(false);
  }
}

