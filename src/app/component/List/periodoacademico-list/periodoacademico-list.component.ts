import {  AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Periodoacademico } from 'src/app/domain/periodoacademico';
import { LoadingService } from 'src/app/service/loading.service';
import { PeriodoacademicoService } from 'src/app/service/periodoacademico.service';
import { PeriodoacademicoCreateComponent } from '../../Create/periodoacademico-create/periodoacademico-create.component';

@Component({
  selector: 'app-periodoacademico-list',
  templateUrl: './periodoacademico-list.component.html',
  styleUrls: ['./periodoacademico-list.component.scss']
})
export class PeriodoacademicoListComponent implements  OnInit, AfterViewInit{
  public periodos = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'periodo', 'anio', 'acciones'];
  @ViewChild('paginator') paginator:any = MatPaginator;
  @ViewChild(MatSort, { static: true }) sort:any = MatSort;
  activos:boolean = true;

  constructor(public dialog: MatDialog,
    private periodoService:PeriodoacademicoService,
    private loading:LoadingService,
    private snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {
    this.periodos.paginator = this.paginator;
    this.periodos.sort = this.sort
  }

  ngOnInit():void {
    this.traerPeriodos();
  }

  traerPeriodos() {
    this.loading.cargando.next(true);
    this.periodoService.getPeriodosAcademicos(this.activos).subscribe((res:any) => {
      this.periodos.data = res;
    }, (error) => {
      this.snackBar.open('Error al traer los datos de la tabla', undefined, {duration: 4000});
    });
    this.loading.cargando.next(false);
  }

  crearNuevoPeriodo() {
    let dialogRef = this.dialog.open(PeriodoacademicoCreateComponent, {
      width: '400px',
      height: 'max-content',
      autoFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) this.traerPeriodos();
    })
  }

  editarPeriodo(periodo:Periodoacademico) {
    let dialogRef = this.dialog.open(PeriodoacademicoCreateComponent, {
      width: '400px',
      height: 'max-content',
      autoFocus: false,
      data: periodo
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) this.traerPeriodos();
    })
  }

}


