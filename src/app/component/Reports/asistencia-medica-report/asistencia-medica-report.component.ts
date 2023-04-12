import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-asistencia-medica-report',
  templateUrl: './asistencia-medica-report.component.html',
  styleUrls: ['./asistencia-medica-report.component.scss']
})
export class AsistenciaMedicaReportComponent {
  fechaHoy = moment().format('DD/MM/YYYY');
  horaActual = moment().format('HH:mm:ss');
}
