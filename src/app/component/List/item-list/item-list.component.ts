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
  valoresItems:any;
  valoresCategorias:any;

  constructor(public dialog: MatDialog,
    private itemService:ItemService,
    private loading:LoadingService,
    private snackBar: MatSnackBar,
    private categoriaService:CategoriaService) {}

  ngAfterViewInit(): void {
    this.itemsTabla.paginator = this.paginator;
    this.itemsTabla.sort = this.sort
  }

  ngOnInit():void {
    this.traerItems();
  }

  traerItems() {
    this.loading.cargando.next(true);
    this.itemService.getItems(this.activos).subscribe((res:any) => {
      if(!res.length) {
        this.itemsTabla.data = [];
        this.snackBar.open('Sin resultados', undefined, {duration: 3000});
        return;
      }
      this.valoresItems = res;
      this.traerCategorias();
    }, (error) => {
      this.snackBar.open('Error al traer los datos de la tabla', undefined, {duration: 4000});
    });
    this.loading.cargando.next(false);
  }

  traerCategorias() {
    this.categoriaService.getCategorias(true).subscribe((res:any) => {
      this.valoresCategorias = res || [];
      this.imprimirTabla();
      return;
    })
  }

  imprimirTabla() {
    this.valoresItems.map((item:any) => {
      let catego = this.valoresCategorias.filter((res:any) => res.id == item.subcategoria_id);
      item.nombreCategoria = catego[0].nombre || '';
    });
    this.itemsTabla.data = this.valoresItems;
  }

  crearNuevoItem() {
    let dialogRef = this.dialog.open(ItemCreateComponent, {
      width: '400px',
      height: 'max-content',
      autoFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) this.traerItems();
    })
  }

  editarItem(item:Inventario) {
    let dialogRef = this.dialog.open(ItemCreateComponent, {
      width: '400px',
      height: 'max-content',
      autoFocus: false,
      data: item
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) this.traerItems();
    })
  }

}

  