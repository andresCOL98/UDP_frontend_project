import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ReporteService } from 'src/app/service/reporte.service';

@Component({
  selector: 'app-reporte-list',
  templateUrl: './reporte-list.component.html',
  styleUrls: ['./reporte-list.component.scss']
})
export class ReporteListComponent {

  reportes:string;


  eventos = [
    { id: 1, titulo: 'Reporte de asistencias por categorías' },
    { id: 2, titulo: 'Informe de atención médica y psicológica' },
    { id: 3, titulo: 'Reporte de inventarios' },
    { id: 4, titulo: 'Informe de participación de eventos' },
    { id: 5, titulo: 'Reporte de eventos' }
  ]

  constructor(
    private router: Router) {}

  ngOnInit() {
  }

  descargar(id:number) {
    switch(id) {
      case 1:
        break;

      case 2:
        break;

      case 3:
        window.open('https://6df8-170-238-236-61.ngrok.io/api/v1/inventario/inventarios/reports')
        break;

      case 4:
        break;
        
      case 5:
        break;
    }
  }
}
