import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { CategoriaService } from 'src/app/service/categoria.service';
import { EventoService } from 'src/app/service/evento.service';
import { LogService } from 'src/app/service/log.service';
import { PeriodoacademicoService } from 'src/app/service/periodoacademico.service';
import { ReporteService } from 'src/app/service/reporte.service';
import { DialogoEventosComponent } from './dialogo-eventos/dialogo-eventos.component';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from 'src/app/service/loading.service';
import { ItemService } from 'src/app/service/item.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reporte-list',
  templateUrl: './reporte-list.component.html',
  styleUrls: ['./reporte-list.component.scss']
})
export class ReporteListComponent {
  @ViewChild('contenedorReporte', {static: false}) el!:ElementRef
  user=localStorage.getItem('currentUser');
  inputFechas = true;
  inputPeriodo = false;
  inputArea = false;
  inputItem = false;
  inputEvento = false;
  tipoReportes = [
    {id: 1, titulo: 'Asistencia por área'},
    {id: 2, titulo: 'Atención médica y psicológica'},
    {id: 3, titulo: 'Control de inventario'},
    {id: 4, titulo: 'Estado del inventario'},
    {id: 5, titulo: 'Eventos'},
    {id: 6, titulo: 'Participación de eventos'}
  ];
  form:any = {
    reporte: '',
    fechaIni: '',
    fechaFin: '',
    periodo: '',
    area: '',
    item: '',
    evento: '',
    nombreEvento: 'Seleccionar...',
  };
  eventos:any;
  periodos:any;
  categorias:any;
  items:any;

  // Para el reporte
  fechaHoy = moment().format('DD/MM/YYYY');
  horaActual = moment().format('hh:mm a');
  nombreReporte = '';
  headersTabla:any = [];
  bodyTabla:any = [];
  tabla1 = false;
  tabla2 = false;
  tabla3 = false;
  tabla4 = false;
  tabla5 = false;
  tabla6 = false;
  usuarios:any;

  constructor(
    private reporteService:ReporteService,
    private logService:LogService,
    private periodoService:PeriodoacademicoService,
    private snackBar:MatSnackBar,
    private categoriaService:CategoriaService,
    private eventoService:EventoService,
    public dialog: MatDialog,
    private loadingService:LoadingService,
    private itemService:ItemService
  ) {}

  ngOnInit() {
    this.traerPeriodos();
    this.traerCategorias();
    this.traerEventos();
    this.traerItems();
  }

  traerPeriodos() {
    this.periodoService.getPeriodosAcademicos(true).subscribe((res:any) => {
      this.periodos = res;
    },(error) => {
      this.snackBar.open('Error al mostrar los periodos académicos', undefined, {duration: 3000});
    })
  }

  traerCategorias() {
    this.categoriaService.getCategorias(true).subscribe((res:any) => {
      this.categorias = res;
    }, (error) => {
      this.snackBar.open('Error al traer las áreas', undefined, {duration: 4000});
    });
  }

  traerEventos() {
    this.eventoService.getEventos().subscribe((res:any) => {
      this.eventos = res;
    },(error) => {
      this.snackBar.open('Error al traer los eventos', undefined, {duration: 3000});
    });
  }

  traerItems() {
    this.itemService.getItems(true).subscribe((res:any) => {
      this.items = res;
    }, (error) => {
      this.snackBar.open('Error al traer los items', undefined, {duration: 4000});
    });
  }

  dialogoEventos() {
    let dialogRef = this.dialog.open(DialogoEventosComponent, {
      width: '800px',
      height: 'max-content',
      autoFocus: false,
      data: {eventos: this.eventos}
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.form.evento = res.id;
        this.form.nombreEvento = res.nombre;
      }
    })
  }

  mostrarOcultarInputs() {
    // Estados default de la interfaz
    this.inputFechas = true;
    this.inputPeriodo = false;
    this.inputArea = false;
    this.inputItem = false;
    this.inputEvento = false;
    this.tabla1 = false;
    this.tabla2 = false;
    this.tabla3 = false;
    this.tabla4 = false;
    this.tabla5 = false;
    this.tabla6 = false;
    this.limpiar();

    switch(this.form.reporte) {
      case '1':
        this.inputArea = true;
        this.inputPeriodo = true;
        break;
      case '2':
        this.inputPeriodo = true;
        break;
      case '3':
        this.inputItem = true;
        this.inputPeriodo = true;
        break;
      case '4':
        this.inputFechas = false;
        break;
      case '5':
        this.inputPeriodo = true;
        this.inputArea = true;
        break;
      case '6':
        this.inputPeriodo = true;
        this.inputEvento = true;
        break;
    }
  }

  log(evento:string,mensaje:string){
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

  limpiar() {
    this.form = {
      reporte: this.form.reporte,
      fechaIni: '',
      fechaFin: '',
      periodo: '',
      area: '',
      item: '',
      evento: '',
      nombreEvento: 'Seleccionar...',
    };
    this.bodyTabla = [];
  }

  validarInputs() {
    let valido = true;
    let msg = 'Los campos no fueron diligenciados correctamente';

    if(this.form.fechaIni && !this.form.fechaFin) {
      valido = false;
    }
    if(this.form.fechaIni > this.form.fechaFin) {
      msg = 'La fecha de inicio no puede ser mayor a la fecha final';
      valido = false;
    }

    switch(this.form.reporte) {
      case '1':
       // if(!this.form.area) {
        //  msg = 'Debe seleccionar un área para filtrar';
         // valido = false;
       // }
        break;
      case '2':
        if(!this.form.fechaIni && !this.form.periodo) {
          valido = false;
        }
        break;
      case '3':
        if(!this.form.fechaIni && !this.form.periodo && !this.form.item) {
          valido = false;
        }
        break;
      case '4':
        valido = true; // En este caso no se pide nada, así que siempre será true
        break;
      case '5':
        if(!this.form.fechaIni && !this.form.periodo && !this.form.area) {
          valido = false;
        }
        break;
      case '6':
        if(!this.form.fechaIni && !this.form.periodo && !this.form.evento) {
          valido = false;
        }
        break;
      default:
        valido = false;
        break;
    }
    if(!valido) this.snackBar.open(msg, undefined, {duration: 5000});
    return valido;
  }

  descargar() {
    let valido = this.validarInputs();
    if(!valido) return;

    this.fechaHoy = moment().format('DD/MM/YYYY');
    this.horaActual = moment().format('hh:mm a');

    if(this.form.reporte == '1') {
      this.reporteAsistenciaPorArea();
    } else if(this.form.reporte == '2') {
      this.reporteAtencionMedica();
    } else if(this.form.reporte == '3') {
      this.reporteControlInventario();
    } else if(this.form.reporte == '4') {
      this.reporteEstadoInventario();
    } else if(this.form.reporte == '5') {
      this.reporteEventos();
    } else if(this.form.reporte == '6') {
      this.reporteAsistenciaEventos();
    }
    this.nombreReporte = this.tipoReportes.filter((repo:any) => repo.id == this.form.reporte)[0].titulo.toUpperCase() || '';
    return;
  }

  reporteAsistenciaPorArea() {
    this.loadingService.cargando.next(true);
    this.reporteService.asistenciaPorArea(this.form.fechaIni, this.form.fechaFin, this.form.periodo || 0, this.form.area || 0)
    .subscribe((res:any) => {
      this.tabla1 = true;
      let datosMostrar:any = [];
      
      res.map((res2:any) => {
        let nomArea = this.categorias.filter((cat:any) => cat.id == res2.subcategoria_id)[0].nombre;
        let periodo = this.periodos.filter((peri:any) => peri.id == res2.periodo_academico_id)[0];
        periodo = periodo.anio + ' - ' + periodo.periodo;

        let obj:any = {
          cedula: res2.documento,
          nombre: res2.nombre,
          programa_academico: res2.programa_academico,
          periodo: periodo,
          nomArea: nomArea,
          fecha: res2.fecha,
        }
        
        datosMostrar.push(obj)
      });
      this.bodyTabla = datosMostrar;
      this.loadingService.cargando.next(false);
      this.log('Generar reporte', `El usuario ${this.user} generó el reporte ${this.nombreReporte}`);
    }, (error) => {
      this.loadingService.cargando.next(false);
      this.snackBar.open('Ha ocurrido un error inesperado', undefined, {duration: 3000});
      throw error;
    });
  }

  reporteAtencionMedica() {
    this.loadingService.cargando.next(true);
    this.reporteService.atencionMedica(this.form.fechaIni, this.form.fechaFin, this.form.periodo || 0)
    .subscribe((res:any) => {
      this.tabla2 = true;
      let datosMostrar:any = [];
      
      res.map((res2:any) => {
        let periodo = this.periodos.filter((peri:any) => peri.id == res2.periodo_academico_id)[0];
        periodo = periodo.anio + ' - ' + periodo.periodo;

        let obj:any = {
          cedula: res2.documento,
          nombre: res2.nombre,
          programa_academico: res2.programa_academico,
          periodo: periodo,
          servicio: res2.tipo_servicio,
          fecha: res2.fecha,
        }
        datosMostrar.push(obj)
      });
      this.bodyTabla = datosMostrar;
      this.loadingService.cargando.next(false);
      this.log('Generar reporte', `El usuario ${this.user} generó el reporte ${this.nombreReporte}`);
    }, (error) => {
      this.loadingService.cargando.next(false);
      this.snackBar.open('Ha ocurrido un error inesperado', undefined, {duration: 3000});
      throw error;
    });
  }

  reporteControlInventario() {
    this.loadingService.cargando.next(true);
    this.reporteService.controlInventario(this.form.fechaIni, this.form.fechaFin, this.form.periodo || 0, this.form.item || 0)
    .subscribe((res:any) => {
      this.tabla3 = true;
      let datosMostrar:any = [];
      
      res.map((res2:any) => {
        let nomItem = this.items.filter((item:any) => item.id == res2.id_item)[0].item;
        let periodo = this.periodos.filter((peri:any) => peri.id == res2.periodo_academico_id)[0];
        periodo = periodo.anio + ' - ' + periodo.periodo;

        let obj:any = {
          fecha: res2.fecha,
          nomItem: nomItem,
          transaccion: res2.transaccion,
          cantidad: res2.cantidad,
          periodo: periodo,
        }
        datosMostrar.push(obj)
      });
      this.bodyTabla = datosMostrar;
      this.loadingService.cargando.next(false);
      this.log('Generar reporte', `El usuario ${this.user} generó el reporte ${this.nombreReporte}`);
    }, (error) => {
      this.loadingService.cargando.next(false);
      this.snackBar.open('Ha ocurrido un error inesperado', undefined, {duration: 3000});
      throw error;
    });
  }

  reporteEstadoInventario() {
    this.loadingService.cargando.next(true);
    this.itemService.getItems(true).subscribe((res:any) => {
      this.tabla4 = true;
      let datosMostrar:any = [];
      res.map((res2:any) => {
        let categoria = this.categorias.filter((catego:any) => catego.id == res2.subcategoria_id)[0].nombre;

        let obj:any = {
          fecha: res2.fecha,
          item: res2.item,
          cantidad: res2.cantidad,
          nomCategoria: categoria,
        }
        datosMostrar.push(obj)
      });
      this.bodyTabla = datosMostrar;
      this.loadingService.cargando.next(false);
      this.log('Generar reporte', `El usuario ${this.user} generó el reporte ${this.nombreReporte}`);
    }, (error) => {
      this.loadingService.cargando.next(false);
      this.snackBar.open('Ha ocurrido un error inesperado', undefined, {duration: 3000});
      throw error;
    });
  }

  reporteEventos() {
    
    this.reporteService.evento(this.form.fechaIni, this.form.fechaFin, this.form.periodo || 0, this.form.area || 0)
    .subscribe((res:any) => {
      this.tabla5 = true;
      let datosMostrar:any = [];
      res.map((res2:any) => {

        let categoria = this.categorias.filter((catego:any) => catego.id == res2.subcategoria_id)[0].nombre;
        let periodo = this.periodos.filter((peri:any) => peri.id == res2.periodo_academico_id)[0];
        periodo = periodo.anio + ' - ' + periodo.periodo;

        let obj:any = {
          nombre: res2.nombre,
          fechaIni: res2.fecha_inicio,
          fechaFin: res2.fecha_fin,
          periodoA: periodo,
          area:categoria,

        }
        datosMostrar.push(obj)
      });
   
      this.bodyTabla = datosMostrar;
      this.loadingService.cargando.next(false);
      this.log('Generar reporte', `El usuario ${this.user} generó el reporte ${this.nombreReporte}`);
    }, (error) => {
      this.loadingService.cargando.next(false);
      this.snackBar.open('Ha ocurrido un error inesperado', undefined, {duration: 3000});
      throw error;
    });
  }

  reporteAsistenciaEventos() {
    this.reporteService.asistenciaEvento(this.form.fechaIni, this.form.fechaFin, this.form.periodo || 0, this.form.evento || 0)
    .subscribe((res:any) => {
      this.tabla6 = true;
      let datosMostrar:any = [];
      res.map((res2:any) => {
        let periodo = this.periodos.filter((peri:any) => peri.id == res2.periodo_academico_id)[0];
        periodo = periodo.anio + ' - ' + periodo.periodo;

        let evento = this.eventos.filter((peri:any) => peri.id == res2.evento_id)[0].nombre;


        let obj:any = {
          nombre: res2.nombre,
          cedula:res2.documento,
          fecha: res2.fecha,
          periodoA: periodo,
          programa_academico:res2.programa_academico,
          nombreEvento:evento,
        }
        datosMostrar.push(obj)
      });
   
      this.bodyTabla = datosMostrar;
      this.loadingService.cargando.next(false);
      this.log('Generar reporte', `El usuario ${this.user} generó el reporte ${this.nombreReporte}`);
    }, (error) => {
      this.snackBar.open('Ha ocurrido un error inesperado', undefined, {duration: 3000});
      throw error;
    });
  }

  generarPdf() {
    html2canvas(this.el.nativeElement).then(canvas => {
      const contentDataUrl = canvas.toDataURL('image/png');
      
      let pdf = new jsPDF('p', 'mm', 'a4');
      let width = pdf.internal.pageSize.getWidth();
      let height = canvas.height * width / canvas.width;
  
      pdf.addImage(contentDataUrl, 'PNG', 0, 0, width, height);
      pdf.save(this.fechaHoy + '_' + this.nombreReporte);
    })
  }
}
