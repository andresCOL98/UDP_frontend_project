import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LogService } from 'src/app/service/log.service';
import { CategoriaCreateComponent } from '../categoria-create/categoria-create.component';

@Component({
  selector: 'app-evento-participacion-create',
  templateUrl: './evento-participacion-create.component.html',
  styleUrls: ['./evento-participacion-create.component.scss']
})
export class EventoParticipacionCreateComponent {
  form = {
    idEvento: '',
    cedula: '',
    nombres: '',
    apellidos: '',
    fechaIni: '',
    fechaFin: '',
  }
  user=localStorage.getItem('currentUser');

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<CategoriaCreateComponent>,
    private logService:LogService
  ) { }

  ngOnInit() {
    this.form = {
      idEvento: this.data.id,
      cedula: '',
      nombres: '',
      apellidos: '',
      fechaIni: this.data.fecha_inicio,
      fechaFin: this.data.fecha_fin,
    }
  }
  log(evento:string,mensaje:string){
    let tiempoTranscurrido = Date.now();
    let hoy = new Date(tiempoTranscurrido);
    
    let logg={
       id:0,
       evento:evento,
       fecha: hoy.toLocaleDateString(),
       mensaje:mensaje,
       nivel:"INFO",
       id_usuario:Number(localStorage.getItem('idUser'))
    }
    this.logService.createLog(logg);
  }

  registrarParticipacion() {
    console.log(this.form);
    this.cerrar();
  }

  cerrar() {
    this.dialogRef.close();
  }
}
