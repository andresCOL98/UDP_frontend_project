import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Asistenciasubcategoria } from 'src/app/domain/asistenciasubcategoria';
import { AsistenciasubcategoriaService } from 'src/app/service/asistenciasubcategoria.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { LoadingService } from 'src/app/service/loading.service';
import { LogService } from 'src/app/service/log.service';
import { PeriodoacademicoService } from 'src/app/service/periodoacademico.service';

@Component({
  selector: 'app-asistenciasubcategoria-create',
  templateUrl: './asistenciasubcategoria-create.component.html',
  styleUrls: ['./asistenciasubcategoria-create.component.scss']
})
export class AsistenciasubcategoriaCreateComponent {

  user=localStorage.getItem('currentUser');
  form = {
    id_pege: '',
    cedula: '',
    nombre: '',
    periodo: '',
    categoria: '',
    fecha: ''
  }
  categorias:any;
  periodos:any;

  constructor(
    private asistenciaService:AsistenciasubcategoriaService,
    private logService:LogService,
    private categoriaService:CategoriaService,
    private periodoService:PeriodoacademicoService,
    private snackBar:MatSnackBar,
    private loading:LoadingService
  ) {}

  ngOnInit() {
    this.traerCategorias();
    this.traerPeriodos();
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

  traerCategorias() {
    this.categoriaService.getCategorias(true).subscribe(res => {
      this.categorias = res;
    }, (error) => {
      this.snackBar.open('Error al mostrar las categorías', undefined, {duration: 3000});
    });
  }

  traerPeriodos() {
    this.periodoService.getPeriodosAcademicos(true).subscribe(res => {
      this.periodos = res;
    }, (error) => {
      this.snackBar.open('Error al mostrar las categorías', undefined, {duration: 3000});
    });
  }

  registrarAsistencia() {
    if(!this.form.id_pege || !this.form.cedula || !this.form.nombre || !this.form.periodo || !this.form.categoria || this.form.fecha) {
      return this.snackBar.open('Llene los campos correctamente', 'OK', {duration: 3000})
    }

    this.loading.cargando.next(true);

    const valores:Asistenciasubcategoria = {
      id: 0,
      fecha: this.form.fecha,
      id_pege: Number(this.form.id_pege),
      nombre: this.form.nombre,
      documento: Number(this.form.cedula),
      periodoAcademico_id: Number(this.form.periodo),
      subcategoria_id: Number(this.form.categoria),
      usuario_id: 123 // OJO! AQUÍ PONER EL ID DEL USUARIO, NO SÉ DE QUÉ VARIABLE DEL LOCALSTORAGE SE SACA
    }

    this.asistenciaService.createAsistenciaSubcategoria(valores).subscribe(res => {
      this.snackBar.open('Asistencia registrada correctamente', undefined, {duration: 4000});
      this.log('Crear asistencia', `Usuario: ${this.user} registró la asistencia de ${valores.id_pege} en categoría ${valores.subcategoria_id}`);
      this.limpiarCampos();
    }, (error) => {
      this.snackBar.open('Proceso fallido, intente nuevamente', undefined, {duration: 4000});
      this.log('Crear asistencia', `Usuario: ${this.user} falló al registrar la asistencia de ${valores.id_pege} en categoría ${valores.subcategoria_id}`);
    });
    return this.loading.cargando.next(false);
  }

  limpiarCampos() {
    this.form = {
      id_pege: '',
      cedula: '',
      nombre: '',
      periodo: '',
      categoria: '',
      fecha: '',
    }
  }
}
