import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Categoria } from 'src/app/domain/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { LoadingService } from 'src/app/service/loading.service';
import { CategoriaCreateComponent } from '../../Create/categoria-create/categoria-create.component';

@Component({
  selector: 'app-control-inventario',
  templateUrl: './control-inventario.component.html',
  styleUrls: ['./control-inventario.component.scss']
})
export class ControlInventarioComponent {
  public categorias = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'nombre', 'transaccion', 'cantidad', 'fecha'];
  @ViewChild('paginator') paginator:any = MatPaginator;
  @ViewChild(MatSort, { static: true }) sort:any = MatSort;
  activos:boolean = true;

  form:any = {
    item: '',
    actual: '',
    transaccion: '',
    cantidad: '',
    concepto:''
  }
  
  constructor(public dialog: MatDialog,
    private categoriaService:CategoriaService,
    private loading:LoadingService,
    private snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {
    this.categorias.paginator = this.paginator;
    this.categorias.sort = this.sort
  }

  ngOnInit():void {
  //  this.traerCategorias();
  }

  traerCategorias() {
    this.loading.cargando.next(true);
    this.categoriaService.getCategorias(this.activos).subscribe((res:any) => {
      this.categorias.data = res;
      this.loading.cargando.next(false);
    }, (error) => {
      this.snackBar.open('Error al traer los datos de la tabla', undefined, {duration: 4000});
      this.loading.cargando.next(false);
    });
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
