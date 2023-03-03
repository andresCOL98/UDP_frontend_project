import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RolCreateComponent } from '../../Create/rol-create/rol-create.component';

@Component({
  selector: 'app-rol-list',
  templateUrl: './rol-list.component.html',
  styleUrls: ['./rol-list.component.scss']
})
export class RolListComponent implements OnInit, AfterViewInit{
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

  crearNuevoRol() {
    let dialogRef = this.dialog.open(RolCreateComponent, {
      width: '400px',
      height: 'max-content',
      autoFocus: false,
      data: {}
    });
  }

}
