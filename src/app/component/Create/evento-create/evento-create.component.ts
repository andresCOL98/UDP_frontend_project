import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Evento } from 'src/app/domain/evento';
import { CategoriaService } from 'src/app/service/categoria.service';
import { EventoService } from 'src/app/service/evento.service';
import { LoadingService } from 'src/app/service/loading.service';
import { LogService } from 'src/app/service/log.service';
import { PeriodoacademicoService } from 'src/app/service/periodoacademico.service';

@Component({
  selector: 'app-evento-create',
  templateUrl: './evento-create.component.html',
  styleUrls: ['./evento-create.component.scss']
})
export class EventoCreateComponent {
  fechaHoy = moment().format('YYYY-MM-DD');
  user = localStorage.getItem('currentUser');
  idUser = localStorage.getItem('idUser');

  form = {
    nombre: '',
    descripcion: '',
    fechaIni: '',
    fechaFin: '',
    categoria: 0,
    periodo: 0
  }
  categorias:any;
  periodos:any;

  constructor(
    private snackBar: MatSnackBar,
    private logService:LogService,
    private categoService:CategoriaService,
    private loading:LoadingService,
    private periodoService:PeriodoacademicoService,
    private eventoService:EventoService
  ) {}

  ngOnInit() {
    this.traerCategorias();
    this.traerPeriodos();
  }

  traerCategorias() {
    this.loading.cargando.next(true);
    this.categoService.getCategorias(true).subscribe((res:any) => {
      this.categorias = res;
      this.loading.cargando.next(false);
    },(error) => {
      this.loading.cargando.next(false);
      this.snackBar.open('Error al mostrar las categorías', undefined, {duration: 3000});
    })
  }

  traerPeriodos() {
    this.loading.cargando.next(true);
    this.periodoService.getPeriodosAcademicos(true).subscribe((res:any) => {
      this.periodos = res;
      this.loading.cargando.next(false);
    },(error) => {
      this.loading.cargando.next(false);
      this.snackBar.open('Error al mostrar los periodos académicos', undefined, {duration: 3000});
    })
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

  registrarEvento() {
    if(moment(this.form.fechaFin) < moment(this.form.fechaIni)) {
      return this.snackBar.open('La fecha inicial no puede ser mayor a la final', 'OK');
    }
    if(this.form.nombre.length < 5 || this.form.descripcion.length < 5 || !this.form.fechaFin || !this.form.fechaIni || !this.form.periodo || !this.form.categoria) {
      return this.snackBar.open('Debe diligenciar correctamente los campos', 'OK');
    }

    let datos:Evento = {
      id: 0,
      nombre: this.form.nombre,
      descripcion: this.form.descripcion,
      fecha_fin: this.form.fechaFin,
      fecha_inicio: this.form.fechaIni,
      periodo_academico_id: this.form.periodo,
      subcategoria_id: this.form.categoria,
      usuario_id: Number(this.idUser)
    }

    this.loading.cargando.next(true);
    this.eventoService.createEvento(datos).subscribe(res => {
      this.snackBar.open('Evento creado correctamente', undefined, {duration: 3000});
      this.loading.cargando.next(false);
      this.log('Crear evento', `El usuario ${this.user} creó el evento ${this.form.nombre}`);
      this.limpiarCampos();
    }, (error) => {
      this.snackBar.open('Error al crear el evento', undefined, {duration: 3000});
      this.loading.cargando.next(false);
      this.log('Crear evento', `El usuario ${this.user} falló al crear el evento ${this.form.nombre}`);
    });
    return;
  }

  limpiarCampos() {
    this.form = {
      nombre: '',
      descripcion: '',
      fechaIni: '',
      fechaFin: '',
      categoria: 0,
      periodo: 0
    }
  }
}
