import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaCreateComponent } from '../../Create/categoria-create/categoria-create.component';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.scss']
})
export class CategoriaListComponent implements OnInit, AfterViewInit  {
  public categorias = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  @ViewChild('paginator') paginator: any = MatPaginator;

  constructor(public dialog: MatDialog) {}

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

  crearNuevaCategoria() {
    let dialogRef = this.dialog.open(CategoriaCreateComponent, {
      width: '400px',
      height: 'max-content',
      autoFocus: false,
      data: {}
    });
  }
}
