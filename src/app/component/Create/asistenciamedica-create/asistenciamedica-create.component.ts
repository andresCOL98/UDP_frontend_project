import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-asistenciamedica-create',
  templateUrl: './asistenciamedica-create.component.html',
  styleUrls: ['./asistenciamedica-create.component.scss']
})
export class AsistenciamedicaCreateComponent {
  fechaHoy = moment().format('YYYY-MM-DD');
  form = {
    cedulaPaciente: '',
    nombrePaciente: '',
    fechaConsulta: this.fechaHoy,
    diagnostico: '',
    descripcion: '',
    tratamiento: '',
  }

  constructor(private snackBar: MatSnackBar,) {}

  ngOnInit() {
  }

  registrarEvento() {
    return console.log(this.form);
  }

  limpiarCampos() {
    this.form = {
      cedulaPaciente: '',
      nombrePaciente: '',
      fechaConsulta: '',
      diagnostico: '',
      descripcion: '',
      tratamiento: '',
    }
  }
}
