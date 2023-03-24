import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { AsistenciaeventoService } from 'src/app/service/asistenciaevento.service';
import { LoadingService } from 'src/app/service/loading.service';
import { LogService } from 'src/app/service/log.service';
import { EventoParticipacionCreateComponent } from '../evento-participacion-create/evento-participacion-create.component';

@Component({
  selector: 'app-evento-informe-create',
  templateUrl: './evento-informe-create.component.html',
  styleUrls: ['./evento-informe-create.component.scss']
})
export class EventoInformeCreateComponent {
  idUser = localStorage.getItem('idUser');
  user=localStorage.getItem('currentUser');
  informe = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<EventoParticipacionCreateComponent>,
    private logService:LogService,
    private loading:LoadingService,
    private eventoAsistenciasService:AsistenciaeventoService,
    public snackBar:MatSnackBar
  ) {
    this.informe = data.informe_evento || '';
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
  
  registrarInforme() {
    this.dialogRef.close();
  }
}
