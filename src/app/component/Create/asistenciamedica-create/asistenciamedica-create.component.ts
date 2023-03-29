import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Asistenciaevento } from 'src/app/domain/asistenciaevento';
import { Asistenciamedica } from 'src/app/domain/asistenciamedica';
import { AsistenciamedicaService } from 'src/app/service/asistenciamedica.service';
import { LoadingService } from 'src/app/service/loading.service';
import { LogService } from 'src/app/service/log.service';
import { PeriodoacademicoService } from 'src/app/service/periodoacademico.service';

@Component({
  selector: 'app-asistenciamedica-create',
  templateUrl: './asistenciamedica-create.component.html',
  styleUrls: ['./asistenciamedica-create.component.scss']
})
export class AsistenciamedicaCreateComponent {
  user = localStorage.getItem('currentUser');
  idUser = localStorage.getItem('idUser');
  periodos:any;
  form:any = {
    observacion: '',
    recomendacion: '',
    otros_datos: '',
    nombre: '',
    documento: null,
    tipoServicio: '',
    periodo: '',
    programa:''
  }

  constructor(private snackBar: MatSnackBar,
    private logService:LogService,
    private asistencia:AsistenciamedicaService,
    private loading:LoadingService,
    private periodoService:PeriodoacademicoService) {}

  ngOnInit() {
    this.traerPeriodos();
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

  traerPeriodos() {
    this.loading.cargando.next(true);
    this.periodoService.getPeriodosAcademicos(true).subscribe((res:any) => {
      this.periodos = res;
      this.loading.cargando.next(false);
    },(error) => {
      this.loading.cargando.next(false);
      this.snackBar.open('Error al mostrar los periodos académicos', undefined, {duration: 3000});
    })
  }

  registrarAtencion() {
    let datos:Asistenciamedica = {
      id: 0,
      fecha: moment().format('YYYY-MM-DD'),
      observacion: this.form.observacion,
      recomendacion: this.form.recomendacion,
      otros_datos: this.form.otros_datos,
      nombre: this.form.nombre,
      documento: this.form.documento,
      usuario_id: Number(this.idUser),
      tipo_servicio: this.form.tipoServicio,
      periodo_academico_id: this.form.periodo,
      programa: this.form.programa
    }

    this.loading.cargando.next(true);

    this.asistencia.createAsistenciaMedica(datos).subscribe(res => {
      this.loading.cargando.next(false);
      this.limpiarCampos();
      this.snackBar.open('Historia guardada correctamente', 'OK', {duration: 3000});
      this.log('Crear atención médica', `Usuario: ${this.user} creó la historia médica de ${datos.documento}`);
    }, (error) => {
      this.loading.cargando.next(false);
      this.snackBar.open('Error al guardar la historia', 'ERROR', {duration: 3000});
      this.log('Crear atención médica', `Usuario: ${this.user} falló al crear historia médica de ${datos.documento}`);
    })
  }

  limpiarCampos() {
    this.form = {
      observacion: '',
      recomendacion: '',
      otros_datos: '',
      nombre: '',
      documento: null,
      tipoServicio: '',
      periodo: ''
    }
  }
}