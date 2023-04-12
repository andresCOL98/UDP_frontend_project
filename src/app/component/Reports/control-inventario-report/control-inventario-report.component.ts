import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-control-inventario-report',
  templateUrl: './control-inventario-report.component.html',
  styleUrls: ['./control-inventario-report.component.scss']
})
export class ControlInventarioReportComponent {
  fechaHoy = moment().format('DD/MM/YYYY');
  horaActual = moment().format('HH:mm:ss');
}
