import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { AsistenciasubcategoriaService } from 'src/app/service/asistenciasubcategoria.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-asistencia-categoria-report',
  templateUrl: './asistencia-categoria-report.component.html',
  styleUrls: ['./asistencia-categoria-report.component.scss']
})
export class AsistenciaCategoriaReportComponent implements OnInit, AfterViewInit{
  public reporte = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'fecha', 'nombre', 'documento', 'periodo_academico_id', 'area','usuario_id','programa_academico'];
  public itemsTabla = new MatTableDataSource<any>();
  @ViewChild('paginator') paginator:any = MatPaginator;
  @ViewChild(MatSort, { static: true }) sort:any = MatSort;
  fechaHoy = moment().format('DD/MM/YYYY');
  horaActual = moment().format('HH:mm:ss');

  activos:boolean = true;
  fecha_inico:string;
  fecha_fin:string;
  periodo_academico_id:number;
  subcategoria_id:number;
  valoresItems:any;
  valoresCategorias:any;

  
  constructor(public dialog: MatDialog,
    private categoriaService:CategoriaService,
    private asistenciaCategoriaService:AsistenciasubcategoriaService,
    private loading:LoadingService,
    private snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {
    this.reporte.paginator = this.paginator;
    this.reporte.sort = this.sort
  }

  ngOnInit():void {
    // this.traerAsistencias();
  }

  traerAsistencias(){
    this.loading.cargando.next(true);
    this.asistenciaCategoriaService.reporte(this.fecha_inico,this.fecha_fin,this.periodo_academico_id,this.subcategoria_id).subscribe((res:any) => {
      this.reporte.data = res;
      this.loading.cargando.next(false);
    }, (error) => {
      this.snackBar.open('Error al traer los datos de la tabla', undefined, {duration: 4000});
      this.loading.cargando.next(false);
    });


  }

  traerCategorias() {
    this.loading.cargando.next(true);
    this.categoriaService.getCategorias(this.activos).subscribe((res:any) => {
      this.reporte.data = res;
      this.valoresItems = res;
      this.loading.cargando.next(false);
    }, (error) => {
      this.snackBar.open('Error al traer los datos de la tabla', undefined, {duration: 4000});
      this.loading.cargando.next(false);
    });
  }
  imprimirTabla() {
    this.valoresItems.map((Asistenciasubcategoria:any) => {
      let catego = this.valoresCategorias.filter((res:any) => res.id == Asistenciasubcategoria.subcategoria_id);
      Asistenciasubcategoria.area = catego[0].nombre || '';
    });
    this.itemsTabla.data = this.valoresItems;
  }
 


}
