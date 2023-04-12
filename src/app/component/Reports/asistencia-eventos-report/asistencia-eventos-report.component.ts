import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-asistencia-eventos-report',
  templateUrl: './asistencia-eventos-report.component.html',
  styleUrls: ['./asistencia-eventos-report.component.scss']
})
export class AsistenciaEventosReportComponent {
  fechaHoy = moment().format('DD/MM/YYYY');
  horaActual = moment().format('HH:mm:ss');
}
