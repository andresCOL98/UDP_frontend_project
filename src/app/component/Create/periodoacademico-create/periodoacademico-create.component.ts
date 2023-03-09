import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from 'src/app/service/loading.service';
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

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<PeriodoacademicoCreateComponent>,
    private periodoService: PeriodoacademicoService,
    private snackBar: MatSnackBar,
    private loading: LoadingService
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
      this.dialogRef.close(true);
    },(error) => {
      this.snackBar.open('Ha fallado la creación del período', undefined, {duration: 3000});
    })
    return this.loading.cargando.next(false);
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
      this.dialogRef.close(true);
    },(error) => {
      this.snackBar.open('Ha fallado la actualización del período', undefined, {duration: 3000});
    })
    return this.loading.cargando.next(false);
  }
}

