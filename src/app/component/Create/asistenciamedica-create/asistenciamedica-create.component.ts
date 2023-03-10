import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { LogService } from 'src/app/service/log.service';

@Component({
  selector: 'app-asistenciamedica-create',
  templateUrl: './asistenciamedica-create.component.html',
  styleUrls: ['./asistenciamedica-create.component.scss']
})
export class AsistenciamedicaCreateComponent {
  fechaHoy = moment().format('YYYY-MM-DD');
  user=localStorage.getItem('currentUser');
  form = {
    cedulaPaciente: '',
    nombrePaciente: '',
    fechaConsulta: this.fechaHoy,
    diagnostico: '',
    descripcion: '',
    tratamiento: '',
  }

  constructor(private snackBar: MatSnackBar,
    private logService:LogService) {}

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
       nivel:"INFO"
    }
    this.logService.createLog(logg);
  }


  registrarEvento() {
    return console.log(this.form);
  }

  limpiarCampos() {
    this.form = {
      cedulaPaciente: '',
      nombrePaciente: '',
      fechaConsulta: '',
      diagnostico: '',
      descripcion: '',
      tratamiento: '',
    }
  }
}
