import { Component } from '@angular/core';
import { LogService } from 'src/app/service/log.service';

@Component({
  selector: 'app-asistenciasubcategoria-create',
  templateUrl: './asistenciasubcategoria-create.component.html',
  styleUrls: ['./asistenciasubcategoria-create.component.scss']
})
export class AsistenciasubcategoriaCreateComponent {

  user=localStorage.getItem('currentUser');
  form = {
    cedula: null,
    nombres: '',
    apellidos: '',
    categoria: '',
    fecha: '',
    hora: ''
  }

  categorias = [
    {value: '', name:"Seleccionar..."},
    {value: 1, name:"Deportes"},
    {value: 2, name:"Orquestas"},
    {value: 3, name:"Gimnasio"},
    {value: 4, name:"Danzas"},
  ];

  constructor(private logService:LogService) {}

  ngOnInit() {
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

  registrarAsistencia() {
    console.log(this.form);
  }

  limpiarCampos() {
    this.form = {
      cedula: null,
      nombres: '',
      apellidos: '',
      categoria: '',
      fecha: '',
      hora: ''
    }
  }
}
