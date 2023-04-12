import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-inventario-report',
  templateUrl: './inventario-report.component.html',
  styleUrls: ['./inventario-report.component.scss']
})
export class InventarioReportComponent {
  fechaHoy = moment().format('DD/MM/YYYY');
  horaActual = moment().format('HH:mm:ss');
}
