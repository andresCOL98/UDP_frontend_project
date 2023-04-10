import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CategoriaService } from 'src/app/service/categoria.service';
import { EventoService } from 'src/app/service/evento.service';
import { LogService } from 'src/app/service/log.service';
import { PeriodoacademicoService } from 'src/app/service/periodoacademico.service';
import { ReporteService } from 'src/app/service/reporte.service';
import { DialogoEventosComponent } from './dialogo-eventos/dialogo-eventos.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reporte-list',
  templateUrl: './reporte-list.component.html',
  styleUrls: ['./reporte-list.component.scss']
})
export class ReporteListComponent {
  user=localStorage.getItem('currentUser');
  inputFechas = true;
  inputPeriodo = false;
  inputArea = false;
  inputEvento = false;
  tipoReportes = [
    { id: 1, titulo: 'Asistencia por área'},
    { id: 2, titulo: 'Atención médica y psicológica'},
    { id: 3, titulo: 'Control de inventario'},
    { id: 4, titulo: 'Estado del inventario'},
    { id: 5, titulo: 'Eventos'},
    { id: 6, titulo: 'Participación de eventos'}
  ];
  form:any = {
    reporte: '',
    fechaIni: '',
    fechaFin: '',
    periodo: '',
    area: '',
    evento: '',
    nombreEvento: 'Seleccionar...',
  };
  eventos:any;
  periodos:any;
  categorias:any;

  constructor(
    private reporteService:ReporteService,
    private logService:LogService,
    private periodoService:PeriodoacademicoService,
    private snackBar:MatSnackBar,
    private categoriaService:CategoriaService,
    private eventoService:EventoService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.traerPeriodos();
    this.traerCategorias();
    this.traerEventos();
    this.snackBar.open('Seleccione un tipo de reporte para mostrar los filtros', 'OK', {duration: 10000});
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

  traerEventos() {
    this.eventoService.getEventos().subscribe((res:any) => {
      this.eventos = res;
    },(error) => {
      this.snackBar.open('Error al traer los eventos', undefined, {duration: 3000});
    });
  }

  dialogoEventos() {
    let dialogRef = this.dialog.open(DialogoEventosComponent, {
      width: '800px',
      height: 'max-content',
      autoFocus: false,
      data: {eventos: this.eventos}
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.form.evento = res.id;
        this.form.nombreEvento = res.nombre;
      }
    })
  }

  mostrarOcultarInputs() {
    // Estados default de la interfaz
    this.inputFechas = true;
    this.inputPeriodo = false;
    this.inputArea = false;
    this.inputEvento = false;

    switch(this.form.reporte) {
      case '1':
        this.inputArea = true;
        this.inputPeriodo = true;
        break;
      case '2':
        this.inputPeriodo = true;
        break;
      case '3':
        this.inputArea = true;
        this.inputPeriodo = true;
        break;
      case '4':
        this.inputFechas = false;
        break;
      case '5':
        this.inputPeriodo = true;
        this.inputArea = true;
        break;
      case '6':
        this.inputPeriodo = true;
        this.inputEvento = true;
        break;
    }
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
