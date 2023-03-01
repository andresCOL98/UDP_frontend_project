import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ItemCreateComponent } from '../../Create/item-create/item-create.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  public inventario = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'item', 'cantidad', 'categoria', 'acciones'];
  @ViewChild('paginator') paginator: any = MatPaginator;

  constructor(public dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.inventario.paginator = this.paginator;
  }

  ngOnInit():void {
    this.inventario.data = [
      {id: 1, item:'Balón de fútbol', cantidad:7, categoria:"Deportes"},
      {id: 2, item:'Saxofón', cantidad:2, categoria:"Orquestas"},
      {id: 3, item:'Colchoneta', cantidad:15, categoria:"Gimnasio"},
      {id: 4, item:'Tambores', cantidad:2, categoria:"Danzas"},
    ];
  }

  crearNuevoItem() {
    let dialogRef = this.dialog.open(ItemCreateComponent, {
      width: '400px',
      height: 'max-content',
      autoFocus: false,
      data: {}
    });
  }
}
