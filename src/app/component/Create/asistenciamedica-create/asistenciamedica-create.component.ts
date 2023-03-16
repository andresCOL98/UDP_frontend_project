import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Asistenciaevento } from 'src/app/domain/asistenciaevento';
import { Asistenciamedica } from 'src/app/domain/asistenciamedica';
import { AsistenciamedicaService } from 'src/app/service/asistenciamedica.service';
import { LoadingService } from 'src/app/service/loading.service';
import { LogService } from 'src/app/service/log.service';

@Component({
  selector: 'app-asistenciamedica-create',
  templateUrl: './asistenciamedica-create.component.html',
  styleUrls: ['./asistenciamedica-create.component.scss']
})
export class AsistenciamedicaCreateComponent {
  user = localStorage.getItem('currentUser');
  idUser = localStorage.getItem('idUser');
  form:any = {
    observacion: '',
    recomendacion: '',
    otros_datos: '',
    id_pege: null,
    nombre: '',
    documento: null
  }

  constructor(private snackBar: MatSnackBar,
    private logService:LogService,
    private asistencia:AsistenciamedicaService,
    private loading:LoadingService) {}

  ngOnInit() {
  }

  log(evento:string,mensaje:string){
    let tiempoTranscurrido = Date.now();
    let hoy = new Date(tiempoTranscurrido);
    let logg={
       id:0,
       evento:evento,
       fecha: hoy.toLocaleDateString(),
       mensaje:mensaje,
       nivel:"INFO",
       id_usuario:Number(localStorage.getItem('idUser'))
    }
    this.logService.createLog(logg);
  }


  registrarAtencion() {
    let datos:Asistenciamedica = {
      id: 0,
      fecha: moment().format('DD-MM-YYYY'),
      observacion: this.form.observacion,
      recomendacion: this.form.recomendacion,
      otros_datos: this.form.otros_datos,
      id_pege: this.form.id_pege,
      nombre: this.form.nombre,
      documento: this.form.documento,
      usuario_id: Number(this.idUser)
    }

    this.loading.cargando.next(true);

    this.asistencia.createAsistenciaMedica(datos).subscribe(res => {
      this.loading.cargando.next(false);
      this.limpiarCampos();
      this.snackBar.open('Historia guardada correctamente', 'OK', {duration: 3000});
      this.log('Crear atención médica', `Usuario: ${this.user} creó la historia médica de ${this.form.id_pege}`);
    }, (error) => {
      this.loading.cargando.next(false);
      this.snackBar.open('Error al guardar la historia', 'ERROR', {duration: 3000});
      this.log('Crear atención médica', `Usuario: ${this.user} falló al crear historia médica de ${this.form.id_pege}`);
    })
  }

  limpiarCampos() {
    this.form = {
      observacion: '',
      recomendacion: '',
      otros_datos: '',
      id_pege: null,
      nombre: '',
      documento: null
    }
  }
}