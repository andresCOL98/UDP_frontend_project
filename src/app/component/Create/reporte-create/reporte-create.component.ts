import { Component } from '@angular/core';
import * as moment from 'moment';
import { LogService } from 'src/app/service/log.service';

@Component({
  selector: 'app-reporte-create',
  templateUrl: './reporte-create.component.html',
  styleUrls: ['./reporte-create.component.scss']
})
export class ReporteCreateComponent {

  user=localStorage.getItem('currentUser');
  constructor(
    private logService:LogService
  ) { }

  ngOnInit(): void {
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

}
