import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaCreateComponent } from '../../Create/categoria-create/categoria-create.component';
import { MatSort } from '@angular/material/sort';
import { LoadingService } from 'src/app/service/loading.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from 'src/app/domain/categoria';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.scss']
})
export class CategoriaListComponent implements OnInit, AfterViewInit  {
  public categorias = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  @ViewChild('paginator') paginator:any = MatPaginator;
  @ViewChild(MatSort, { static: true }) sort:any = MatSort;
  activos:boolean = true;
  constructor(public dialog: MatDialog,
    private categoriaService:CategoriaService,
    private loading:LoadingService,
    private snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {
    this.categorias.paginator = this.paginator;
    this.categorias.sort = this.sort
  }

  ngOnInit():void {
   this.traerCategorias();
  }

  traerCategorias() {
    this.loading.cargando.next(true);
    this.categoriaService.getCategorias(this.activos).subscribe((res:any) => {
      this.categorias.data = res;
    }, (error) => {
      this.snackBar.open('Error al traer los datos de la tabla', undefined, {duration: 4000});
    });
    this.loading.cargando.next(false);
  }

  crearNuevaCategoria() {
    let dialogRef = this.dialog.open(CategoriaCreateComponent, {
      width: '400px',
      height: 'max-content',
      autoFocus: false,
      data: {}
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res) this.traerCategorias();
    })
  }

  editarCategoria(categoria:Categoria) {
    let dialogRef = this.dialog.open(CategoriaCreateComponent, {
      width: '400px',
      height: 'max-content',
      autoFocus: false,
      data: categoria
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) this.traerCategorias();
    })
  }
}
