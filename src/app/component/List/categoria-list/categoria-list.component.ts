import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.scss']
})
export class CategoriaListComponent implements OnInit, AfterViewInit  {
  public categorias = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  @ViewChild('paginator') paginator: any = MatPaginator;

  constructor() {}

  ngAfterViewInit(): void {
    this.categorias.paginator = this.paginator;
  }

  ngOnInit():void {
    this.categorias.data = [
      {id: 1, nombre:"Deportes"},
      {id: 2, nombre:"Orquestas"},
      {id: 3, nombre:"Gimnasio"},
      {id: 4, nombre:"Danzas"},
    ];
  }
}
