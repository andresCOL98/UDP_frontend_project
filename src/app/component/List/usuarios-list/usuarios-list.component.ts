import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Rol } from 'src/app/domain/rol';
import { LoadingService } from 'src/app/service/loading.service';
import { RolService } from 'src/app/service/rol.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { PermisoCreateComponent } from '../../Create/permiso-create/permiso-create.component';
import { RolCreateComponent } from '../../Create/rol-create/rol-create.component';
import { UsuariosCreateComponent } from '../../Create/usuarios-create/usuarios-create.component';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent {
  public usuariosTabla = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'usuario', 'nombre', 'rol', 'acciones'];
  @ViewChild('paginator') paginator:any = MatPaginator;
  @ViewChild(MatSort, { static: true }) sort:any = MatSort;
  activos:boolean = true;
  roles:any;
  usuarios:any;

  constructor(public dialog: MatDialog,
    private usuarioService:UsuarioService,
    private loading:LoadingService,
    private snackBar: MatSnackBar,
    private rolService: RolService
  ) {}

  ngAfterViewInit(): void {
    this.usuariosTabla.paginator = this.paginator;
    this.usuariosTabla.sort = this.sort
  }

  ngOnInit():void {
    this.traerUsuarios();
  }

  traerUsuarios() {
    this.loading.cargando.next(true);
    this.usuarioService.getUsuarios(this.activos).subscribe((res:any) => {
      this.usuarios = res;
      this.loading.cargando.next(false);
      this.traerRoles();
    }, (error) => {
      this.snackBar.open('Error al traer los datos de la tabla', undefined, {duration: 4000});
      this.loading.cargando.next(false);
    });
  }

  traerRoles() {
    this.loading.cargando.next(true);
    this.rolService.getRoles(this.activos).subscribe((res:any) => {
      this.roles = res;
      this.loading.cargando.next(false);
      this.imprimirTabla();
    }, (error) => {
      this.snackBar.open('Error al traer los datos de la tabla', undefined, {duration: 4000});
      this.loading.cargando.next(false);
    });
  }

  imprimirTabla() {
    this.usuarios.map((item:any) => {
      let rol = this.roles.filter((res:any) => res.id == item.rol_id);
      item.nombreRol = rol[0].nombre || '';
    });
    this.usuariosTabla.data = this.usuarios;
  }

  editarRol(rol:Rol) {
    let dialogRef = this.dialog.open(UsuariosCreateComponent, {
      width: '500px',
      height: 'max-content',
      autoFocus: false,
      data: rol
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) this.traerUsuarios();
    });
  }
}
