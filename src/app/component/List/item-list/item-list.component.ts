import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ItemCreateComponent } from '../../Create/item-create/item-create.component';
import { MatSort } from '@angular/material/sort';
import { ItemService } from 'src/app/service/item.service';
import { LoadingService } from 'src/app/service/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Inventario } from 'src/app/domain/inventario';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, AfterViewInit{
  public inventario = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'item', 'cantidad', 'nombreCategoria', 'acciones'];
  public itemsTabla = new MatTableDataSource<any>();
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
