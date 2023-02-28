import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-inventario-list',
  templateUrl: './inventario-list.component.html',
  styleUrls: ['./inventario-list.component.scss']
})
export class InventarioListComponent {
  public inventario = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'item', 'cantidad', 'categoria', 'acciones'];
  @ViewChild('paginator') paginator: any = MatPaginator;

  constructor() {}

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
}
