import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Rol } from 'src/app/domain/rol';
import { LoadingService } from 'src/app/service/loading.service';
import { RolService } from 'src/app/service/rol.service';
import { PermisoCreateComponent } from '../../Create/permiso-create/permiso-create.component';
import { RolCreateComponent } from '../../Create/rol-create/rol-create.component';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent {
  public usuarios = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  @ViewChild('paginator') paginator:any = MatPaginator;
  @ViewChild(MatSort, { static: true }) sort:any = MatSort;
  activos:boolean = true;

  constructor(public dialog: MatDialog,
    private rolService:RolService,
    private loading:LoadingService,
    private snackBar: MatSnackBar,) {}

  ngAfterViewInit(): void {
    this.usuarios.paginator = this.paginator;
    this.usuarios.sort = this.sort
  }

  ngOnInit():void {
    this.traerUsuarios();
  }

  traerUsuarios() {
    this.loading.cargando.next(true);
    this.rolService.getRoles(this.activos).subscribe((res:any) => {
      this.usuarios.data = res;
      this.loading.cargando.next(false);
    }, (error) => {
      this.snackBar.open('Error al traer los datos de la tabla', undefined, {duration: 4000});
      this.loading.cargando.next(false);
    });
  }

  crearNuevoRol() {
    let dialogRef = this.dialog.open(RolCreateComponent, {
      width: '400px',
      height: 'max-content',
      autoFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) this.traerUsuarios();
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
      if(res) this.traerUsuarios();
    });
  }

  verPermisosRol(rol:Rol) {
    let dialogRef = this.dialog.open(PermisoCreateComponent, {
      width: '400px',
      height: '600px',
      autoFocus: false,
      data: rol
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) this.traerUsuarios();
    });
  }
}
