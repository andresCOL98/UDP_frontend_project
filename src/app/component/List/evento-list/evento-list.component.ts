import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { CategoriaService } from 'src/app/service/categoria.service';
import { EventoService } from 'src/app/service/evento.service';
import { LoadingService } from 'src/app/service/loading.service';
import { LogService } from 'src/app/service/log.service';
import { PeriodoacademicoService } from 'src/app/service/periodoacademico.service';
import { EventoInformeCreateComponent } from '../../Create/evento-informe-create/evento-informe-create.component';
import { EventoParticipacionCreateComponent } from '../../Create/evento-participacion-create/evento-participacion-create.component';

@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.component.html',
  styleUrls: ['./evento-list.component.scss']
})
export class EventoListComponent {
  form = {
    nombre: '',
    fecha: '',
    categoria: '',
  }
  categorias:any;
  eventos:any = [];
  eventosFiltrados:any = [];

  constructor(
    private dialog:MatDialog,
    private snackBar: MatSnackBar,
    private categoService:CategoriaService,
    private loading:LoadingService,
    private eventoService:EventoService
  ) {}

  ngOnInit() {
    this.traerCategorias();
    this.buscar();
  }

  traerCategorias() {
    this.categoService.getCategorias(true).subscribe((res:any) => {
      this.categorias = res;
    },(error) => {
      this.snackBar.open('Error al mostrar las categorías', undefined, {duration: 3000});
    });
  }

  buscar() {
    if(this.form.categoria || this.form.fecha) {
      this.traerEventosFiltro();
    } else {
      this.traerEventos();
    }
  }

  traerEventos() {
    this.loading.cargando.next(true);
    this.eventoService.getEventos().subscribe((res:any) => {
      this.eventos = res;
      this.loading.cargando.next(false);
      this.filtrarNombre();
    },(error) => {
      this.loading.cargando.next(false);
      this.snackBar.open('Error al mostrar los eventos', undefined, {duration: 3000});
    });
  }

  traerEventosFiltro() {
    this.loading.cargando.next(true);
    
    this.eventoService.getByFechaCategoria(this.form.fecha, this.form.categoria).subscribe((res:any) => {
      this.eventos = res;
      this.loading.cargando.next(false);
      this.form.nombre = '';
      this.filtrarNombre();
    }, (error) => {
      this.loading.cargando.next(false);
      this.snackBar.open('Error al mostrar los eventos', undefined, {duration: 3000});
    });
  }

  registrarParticipacion(evento:any) {
    let dialogRef = this.dialog.open(EventoParticipacionCreateComponent, {
      width: '400px',
      height: 'max-content',
      autoFocus: false,
      data: evento
    });
  }

  filtrarNombre() {
    this.eventosFiltrados = this.eventos.filter((res:any) => res.nombre.toLowerCase().indexOf(this.form.nombre) > -1);

    // Condicional para mostrar u ocultar el botón de informes
    let fechaHoy = moment();
    this.eventosFiltrados.map((res:any) => {
      if(fechaHoy > moment(res.fecha_fin)) res.informe = true;
      else res.informe = false;
    })
  }

  escribirInforme(evento:any) {
    let dialogRef = this.dialog.open(EventoInformeCreateComponent, {
      width: '800px',
      height: 'max-content',
      autoFocus: false,
      data: evento
    });
  }
  
}
