import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-reporte-list',
  templateUrl: './reporte-list.component.html',
  styleUrls: ['./reporte-list.component.scss']
})
export class ReporteListComponent {

  eventos = [
    { id: 1, titulo: 'Reporte de asistencias por categorías' },
    { id: 2, titulo: 'Informe de atención médica y psicológica' },
    { id: 3, titulo: 'Reporte de inventarios' },
    { id: 4, titulo: 'Informe de participación de eventos' },
    { id: 5, titulo: 'Reporte de eventos' }
  ]

  constructor() {}

  ngOnInit() {
  }

  descargar(id:number) {
    switch(id) {
      case 1:
        console.log(id);
        break;

      case 2:
        console.log(id);
        break;

      case 3:
        console.log(id);
        break;

      case 4:
        console.log(id);
        break;
        
      case 5:
        console.log(id);
        break;
    }
  }
}
