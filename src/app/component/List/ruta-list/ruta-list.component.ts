import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Rol } from 'src/app/domain/rol';
import { LoadingService } from 'src/app/service/loading.service';
import { PermisoService } from 'src/app/service/permiso.service';
import { RutaService } from 'src/app/service/ruta.service';
import { PermisoCreateComponent } from '../../Create/permiso-create/permiso-create.component';

@Component({
  selector: 'app-ruta-list',
  templateUrl: './ruta-list.component.html',
  styleUrls: ['./ruta-list.component.scss']
})
export class RutaListComponent {
  public rutas = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'ruta', 'acciones'];
  @ViewChild('paginator') paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: true }) sort:any = MatSort;


  constructor(public dialog: MatDialog,
    private rutaService:RutaService,
    private loading:LoadingService,
    private snackBar:MatSnackBar) {}

  ngAfterViewInit(): void {
    this.rutas.paginator = this.paginator;
    this.rutas.sort = this.sort

  }

  ngOnInit():void {
    this.traerRutas();
  }

  traerRutas() {
    this.loading.cargando.next(true);
    this.rutaService.getRutas().subscribe((res:any) => {
      this.rutas.data = res;
    }, (error) => {
      this.snackBar.open('Error al traer los datos de la tabla', undefined, {duration: 4000});
    });
    this.loading.cargando.next(false);
  }

  crearNuevaRuta() {
    let dialogRef = this.dialog.open(PermisoCreateComponent, {
      width: '400px',
      height: 'max-content',
      autoFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) this.traerRutas();
    })
  }

  editarRuta(rol:Rol) {
    let dialogRef = this.dialog.open(PermisoCreateComponent, {
      width: '400px',
      height: 'max-content',
      autoFocus: false,
      data: rol
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) this.traerRutas();
    })
  }
}
