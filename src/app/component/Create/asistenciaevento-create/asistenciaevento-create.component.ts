import { Component } from '@angular/core';
import { LogService } from 'src/app/service/log.service';

@Component({
  selector: 'app-asistenciaevento-create',
  templateUrl: './asistenciaevento-create.component.html',
  styleUrls: ['./asistenciaevento-create.component.scss']
})
export class AsistenciaeventoCreateComponent {

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
       fecha: hoy.toLocaleDateString(),
       mensaje:mensaje,
       nivel:"INFO"
    }
    this.logService.createLog(logg);
  }

}
