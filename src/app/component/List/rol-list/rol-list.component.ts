import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Rol } from 'src/app/domain/rol';
import { LoadingService } from 'src/app/service/loading.service';
import { RolService } from 'src/app/service/rol.service';
import { RolCreateComponent } from '../../Create/rol-create/rol-create.component';

@Component({
  selector: 'app-rol-list',
  templateUrl: './rol-list.component.html',
  styleUrls: ['./rol-list.component.scss']
})
export class RolListComponent implements OnInit, AfterViewInit{
  public roles = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  @ViewChild('paginator') paginator:any = MatPaginator;
  @ViewChild(MatSort, { static: true }) sort:any = MatSort;
  activos:boolean = true;

  constructor(public dialog: MatDialog,
    private rolService:RolService,
    private loading:LoadingService,
    private snackBar: MatSnackBar,) {}

  ngAfterViewInit(): void {
    this.roles.paginator = this.paginator;
    this.roles.sort = this.sort
  }

  ngOnInit():void {
    this.traerRoles();
  }

  traerRoles() {
    this.loading.cargando.next(true);
    this.rolService.getRoles(this.activos).subscribe((res:any) => {
      this.roles.data = res;
    }, (error) => {
      this.snackBar.open('Error al traer los datos de la tabla', undefined, {duration: 4000});
    });
    this.loading.cargando.next(false);
  }

  crearNuevoRol() {
    let dialogRef = this.dialog.open(RolCreateComponent, {
      width: '400px',
      height: 'max-content',
      autoFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) this.traerRoles();
    })
  }

  editarRol(rol:Rol) {
    let dialogRef = this.dialog.open(RolCreateComponent, {
      width: '400px',
      height: 'max-content',
      autoFocus: false,
      data: rol
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) this.traerRoles();
    })
  }

}
