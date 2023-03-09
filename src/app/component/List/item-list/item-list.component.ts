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
import { Categoria } from 'src/app/domain/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, AfterViewInit{
  public inventario = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'item', 'cantidad', 'subcategoria_id', 'acciones'];
  public items = new MatTableDataSource<any>();
  @ViewChild('paginator') paginator:any = MatPaginator;
  @ViewChild(MatSort, { static: true }) sort:any = MatSort;
  activos:boolean = true;

  public listaCategorias: Categoria[];

  constructor(public dialog: MatDialog,
    private itemService:ItemService,
    private loading:LoadingService,
    private snackBar: MatSnackBar,
    private categoriaService:CategoriaService) {}

  ngAfterViewInit(): void {
    this.items.paginator = this.paginator;
    this.items.sort = this.sort
  }

  ngOnInit():void {
    this.traerItems();
    this.getListaCategorias();

  }

  public getListaCategorias() {
    this.categoriaService.getCategorias(this.activos).subscribe((res:any) => {
      this.listaCategorias = res;
    })
  }

  traerItems() {
    this.loading.cargando.next(true);
    this.itemService.getItems(this.activos).subscribe((res:any) => {
      this.items.data = res;
    }, (error) => {
      this.snackBar.open('Error al traer los datos de la tabla', undefined, {duration: 4000});
    });
    this.loading.cargando.next(false);
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

  