import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { LogService } from 'src/app/service/log.service';

@Component({
  selector: 'app-evento-create',
  templateUrl: './evento-create.component.html',
  styleUrls: ['./evento-create.component.scss']
})
export class EventoCreateComponent {
  fechaHoy = moment().format('YYYY-MM-DD');
  user=localStorage.getItem('currentUser');

  form = {
    nombre: '',
    fechaIni: '',
    fechaFin: '',
    categoria: '',
    descripcion: '',
  }

  categorias = [
    {value: '', name:"Seleccionar..."},
    {value: 1, name:"Deportes"},
    {value: 2, name:"Orquestas"},
    {value: 3, name:"Gimnasio"},
    {value: 4, name:"Danzas"},
  ];

  constructor(private snackBar: MatSnackBar,
    private logService:LogService) {}

  ngOnInit() {
  }
  log(evento:string,mensaje:string){
    let tiempoTranscurrido = Date.now();
    let hoy = new Date(tiempoTranscurrido);
    let u=localStorage.getItem('currentUser');
    let logg={
       id:0,
       evento:evento,
       fecha: hoy.toLocaleDateString(),
       mensaje:mensaje,
       nivel:"INFO"
    }
    this.logService.createLog(logg);
  }

  registrarEvento() {
    if(moment(this.form.fechaFin) > moment(this.form.fechaIni)) {
      return this.snackBar.open('La fecha final no puede ser mayor a la inicial', 'OK');
    }
    return console.log(this.form);
  }

  limpiarCampos() {
    this.form = {
      nombre: '',
      fechaIni: '',
      fechaFin: '',
      categoria: '',
      descripcion: '',
    }
  }
}
