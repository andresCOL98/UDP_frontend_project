import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Asistenciaevento } from 'src/app/domain/asistenciaevento';
import { AsistenciaeventoService } from 'src/app/service/asistenciaevento.service';
import { LoadingService } from 'src/app/service/loading.service';
import { LogService } from 'src/app/service/log.service';
import { PeriodoacademicoService } from 'src/app/service/periodoacademico.service';
import { CategoriaCreateComponent } from '../categoria-create/categoria-create.component';

@Component({
  selector: 'app-evento-participacion-create',
  templateUrl: './evento-participacion-create.component.html',
  styleUrls: ['./evento-participacion-create.component.scss']
})
export class EventoParticipacionCreateComponent {
  fechaHoy = moment().format('YYYY-MM-DD');
  idUser = localStorage.getItem('idUser');
  periodos:any;
  form = {
    cedula: '',
    nombre: '',
    fecha: '',
    periodo: null,
    programa:''
  }

  user=localStorage.getItem('currentUser');

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<EventoParticipacionCreateComponent>,
    private logService:LogService,
    private loading:LoadingService,
    private eventoAsistenciasService:AsistenciaeventoService,
    public snackBar:MatSnackBar,
    private periodoService:PeriodoacademicoService
  ) { }

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

  registrarParticipacion() {
    if(!this.form.cedula || !this.form.nombre || !this.form.fecha) {
      return this.snackBar.open('Llene los campos correctamente', 'OK', {duration: 3000})
    }

    this.loading.cargando.next(true);

    const valores:Asistenciaevento = {
      id: 0,
      fecha: this.form.fecha,
      nombre: this.form.nombre,
      documento: Number(this.form.cedula),
      evento_id: this.data.id,
      usuario_id: Number(this.idUser),
      periodo_academico_id: Number(this.form.periodo),
      programa_academico:this.form.programa
    }

    this.eventoAsistenciasService.createAsistenciaEvento(valores).subscribe(res => {
      this.snackBar.open('Asistencia registrada correctamente', undefined, {duration: 4000});
      this.log('Crear asistencia evento', `Usuario: ${this.user} registró la asistencia de ${valores.documento} en evento ${valores.evento_id}`);
      this.loading.cargando.next(false);
      this.cerrar();
    }, (error) => {
      this.snackBar.open('Proceso fallido, intente nuevamente', undefined, {duration: 4000});
      this.log('Crear asistencia evento', `Usuario: ${this.user} falló al registrar la asistencia de ${valores.documento} en evento ${valores.evento_id}`);
      this.loading.cargando.next(false);
    });
    return;
  }

  cerrar() {
    this.dialogRef.close();
  }
}
