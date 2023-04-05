import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CategoriaService } from 'src/app/service/categoria.service';
import { LogService } from 'src/app/service/log.service';
import { PeriodoacademicoService } from 'src/app/service/periodoacademico.service';
import { ReporteService } from 'src/app/service/reporte.service';

@Component({
  selector: 'app-reporte-list',
  templateUrl: './reporte-list.component.html',
  styleUrls: ['./reporte-list.component.scss']
})
export class ReporteListComponent {

  reportes:string;

  user=localStorage.getItem('currentUser');
  tipoReportes = [
    { id: 1, titulo: 'Reporte de asistencias por área' },
    { id: 2, titulo: 'Informe de atención médica y psicológica' },
    { id: 3, titulo: 'Reporte de inventarios' },
    { id: 4, titulo: 'Informe de participación de eventos' },
    { id: 5, titulo: 'Reporte de eventos' }
  ];
  form:any = {
    reporte: '',
    fechaIni: '',
    fechaFin: '',
    periodo: '',
    area: ''
  };
  periodos:any;
  categorias:any;

  constructor(
    private reporteService:ReporteService,
    private logService:LogService,
    private periodoService:PeriodoacademicoService,
    private snackBar:MatSnackBar,
    private categoriaService:CategoriaService
  ) {}

  ngOnInit() {
    this.traerPeriodos();
    this.traerCategorias();
  }

  traerPeriodos() {
    this.periodoService.getPeriodosAcademicos(true).subscribe((res:any) => {
      this.periodos = res;
    },(error) => {
      this.snackBar.open('Error al mostrar los periodos académicos', undefined, {duration: 3000});
    })
  }

  traerCategorias() {
    this.categoriaService.getCategorias(true).subscribe((res:any) => {
      this.categorias = res;
    }, (error) => {
      this.snackBar.open('Error al traer las áreas', undefined, {duration: 4000});
    });
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

  descargar() {
    switch(this.form.reporte) {
      case 1:
        this.log("Generar Reporte","Usuario: " + this.user + " generó reporte de inventarios");
        break;
      case 2:
        this.log("Generar Reporte","Usuario: " + this.user + " generó reporte de inventarios");
        break;
      case 3:
        window.open(this.reporteService.getRerporteInventario());
        this.log("Generar Reporte","Usuario: " + this.user + " generó reporte de inventarios");
        break;
      case 4:
        this.log("Generar Reporte","Usuario: " + this.user + " generó reporte de inventarios");
        break;
      case 5:
        this.log("Generar Reporte","Usuario: " + this.user + " generó reporte de inventarios");
        break;
    }
  }
}
