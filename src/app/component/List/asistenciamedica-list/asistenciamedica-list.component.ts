import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { AsistenciamedicaService } from 'src/app/service/asistenciamedica.service';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-asistenciamedica-list',
  templateUrl: './asistenciamedica-list.component.html',
  styleUrls: ['./asistenciamedica-list.component.scss']
})
export class AsistenciamedicaListComponent {
  form = {
    cedula: null,
    fecha: '',
  }
  historiasMedicas:any = [];

  constructor(
    private loading:LoadingService,
    private asistencia:AsistenciamedicaService,
    private snackBar:MatSnackBar
  ) {}

  ngOnInit() {
  }

  buscarHistoriasMedicas() {
    this.loading.cargando.next(true);
    this.historiasMedicas = [];

    if(!this.form.cedula && this.form.fecha) {
      this.buscarPorFecha();
    } else if(this.form.cedula && !this.form.fecha) {
      this.buscarPorCedula();
    } else if(this.form.cedula && this.form.fecha) {
      this.buscarPorAmbos();
    }
  }

  buscarPorFecha() {
    let fecha = moment(this.form.fecha, 'YYYY-MM-DD').format('DD-MM-YYYY');
    this.asistencia.findByFecha(fecha).subscribe(res => {
      this.historiasMedicas = res;
      this.loading.cargando.next(false);
    }, (error) => {
      this.snackBar.open('No se encontraron resultados');
      this.loading.cargando.next(false);
    });
  }

  buscarPorCedula() {
    this.asistencia.findByIdPege(this.form.cedula).subscribe(res => {
      this.historiasMedicas = res;
      this.loading.cargando.next(false);
    }, (error) => {
      this.snackBar.open('No se encontraron resultados');
      this.loading.cargando.next(false);
    });
  }

  buscarPorAmbos() {
    let fecha = moment(this.form.fecha, 'YYYY-MM-DD').format('DD-MM-YYYY');
    this.asistencia.findByIdPegeAndFecha(fecha, this.form.cedula).subscribe(res => {
      this.historiasMedicas = res;
      this.loading.cargando.next(false);
    }, (error) => {
      this.snackBar.open('No se encontraron resultados');
      this.loading.cargando.next(false);
    });
  }
}
