import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-eventos-report',
  templateUrl: './eventos-report.component.html',
  styleUrls: ['./eventos-report.component.scss']
})
export class EventosReportComponent {
  fechaHoy = moment().format('DD/MM/YYYY');
  horaActual = moment().format('HH:mm:ss');
}
