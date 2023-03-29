import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Evento } from 'src/app/domain/evento';
import { EventoService } from 'src/app/service/evento.service';
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

  constructor(@Inject(MAT_DIALOG_DATA) public data:Evento,
    public dialogRef: MatDialogRef<EventoParticipacionCreateComponent>,
    private logService:LogService,
    private loading:LoadingService,
    private eventoAsistenciasService:EventoService,
    public snackBar:MatSnackBar
  ) {
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
    this.eventoAsistenciasService.updateEvento(this.data).subscribe((res:any) => {
      this.dialogRef.close('Proceso exitoso');
      this.snackBar.open('Informe guardado', undefined, {duration: 3000});
      this.log('Registrar informe', `Usuario ${this.user} registró el informe del evento ${this.data.id} ${this.data.nombre}`);
    }, (error) => {
      this.snackBar.open('Error al guardar', undefined, {duration: 3000});
      this.log('Registrar informe', `Usuario ${this.user} falló al registrar el informe del evento ${this.data.id} ${this.data.nombre}`);
    });
  }
}
