import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { LogService } from 'src/app/service/log.service';
import { ReporteService } from 'src/app/service/reporte.service';

@Component({
  selector: 'app-reporte-list',
  templateUrl: './reporte-list.component.html',
  styleUrls: ['./reporte-list.component.scss']
})
export class ReporteListComponent {

  reportes:string;

  user=localStorage.getItem('currentUser');
  eventos = [
    { id: 1, titulo: 'Reporte de asistencias por categorías' },
    { id: 2, titulo: 'Informe de atención médica y psicológica' },
    { id: 3, titulo: 'Reporte de inventarios' },
    { id: 4, titulo: 'Informe de participación de eventos' },
    { id: 5, titulo: 'Reporte de eventos' }
  ]

  constructor(
    private router: Router,
    private reporteService:ReporteService,
    private logService:LogService) {}

  ngOnInit() {
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

  descargar(id:number) {
    switch(id) {
      case 1:
        this.log("Generar Reporte","Usuario: " + this.user + " generó reporte de inventarios");

        break;

      case 2:
        this.log("Generar Reporte","Usuario: " + this.user + " generó reporte de inventarios");
        break;

      case 3:
        window.open(this.reporteService.getRerporteInventario());
        this.log("Generar Reporte","Usuario: " + this.user + " generó reporte de inventarios");
        break;

      case 4:
        this.log("Generar Reporte","Usuario: " + this.user + " generó reporte de inventarios");

        break;
        
      case 5:
        this.log("Generar Reporte","Usuario: " + this.user + " generó reporte de inventarios");

        break;
    }
  }
}
