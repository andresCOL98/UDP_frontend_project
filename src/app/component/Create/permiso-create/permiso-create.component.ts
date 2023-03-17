import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Permiso } from 'src/app/domain/permiso';
import { LoadingService } from 'src/app/service/loading.service';
import { LogService } from 'src/app/service/log.service';
import { PermisoService } from 'src/app/service/permiso.service';
import { RutaService } from 'src/app/service/ruta.service';

@Component({
  selector: 'app-permiso-create',
  templateUrl: './permiso-create.component.html',
  styleUrls: ['./permiso-create.component.scss']
})
export class PermisoCreateComponent implements OnInit  {
  nombreRuta:string = '';
  user=localStorage.getItem('currentUser');
  public tabla = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['ruta', 'acciones'];
  @ViewChild('paginator') paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: true }) sort:any = MatSort;

  rutas:any;
  permisos:any;

  constructor(@Inject(MAT_DIALOG_DATA) public rol:any,
    public dialogRef: MatDialogRef<PermisoCreateComponent>,
    public snackBar:MatSnackBar,
    public rutaService:RutaService,
    private loading: LoadingService,
    private logService:LogService,
    private permisoService:PermisoService
  ) { }

  ngAfterViewInit(): void {
    this.tabla.paginator = this.paginator;
    this.tabla.sort = this.sort
  }

  ngOnInit(): void {
    this.traerRutas();
  }

  public openSnackBar(mesagge:string,action:string){
    this.snackBar.open(mesagge,action,{duration:3000});
  }

  log(evento:string,mensaje:string){
    let tiempoTranscurrido = Date.now();
    let hoy = new Date(tiempoTranscurrido);
    
    let logg={
       id:0,
       evento:evento,
       fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
       mensaje:mensaje,
       nivel:"INFO",
       id_usuario:Number(localStorage.getItem('idUser'))
    }
    this.logService.createLog(logg).subscribe();
  }

  traerRutas() {
    this.loading.cargando.next(true);
    this.rutaService.getRutas().subscribe((res:any) => {
      this.rutas = res;
      this.loading.cargando.next(false);
      this.traerPermisos();
    }, (error) => {
      this.snackBar.open('Error al traer las rutas', undefined, {duration: 4000});
      this.loading.cargando.next(false);
    });
  }

  traerPermisos() {
    this.loading.cargando.next(true);
    this.permisoService.getPermisoByRol(this.rol.id).subscribe((res:any) => {
      this.permisos = res;
      this.loading.cargando.next(false);
      this.relacionarRutasRoles();
    }, (error) => {
      this.snackBar.open('Error al traer los permisos del rol', undefined, {duration: 4000});
      this.loading.cargando.next(false);
    });
  }

  relacionarRutasRoles() {
    this.rutas.map((res:any) => {
      let existe = this.permisos.filter((per:any) => per.ruta_id == res.id);
      if(existe.length) res.activo = true;
      else res.activo = false;
    });
    this.tabla.data = this.rutas;
  }

  activarDesactivarRuta(permiso:any) {
    let datos:Permiso = {
      rol_id: this.rol.id,
      ruta_id: permiso.id
    }
    if(permiso.activo) {
      this.permisoService.createPermiso(datos).subscribe(res => {
        this.log('Otorgar permiso', `Usuario ${this.user} asignó la ruta ${permiso.nombre} al rol ${datos.rol_id}`);
        this.openSnackBar('Permiso otorgado', 'OK');
        this.traerPermisos();
      },(error) => {
        this.log('Otorgar permiso', `Usuario ${this.user} falló al asignar la ruta ${permiso.nombre} al rol ${datos.rol_id}`);
        this.traerPermisos();
        this.openSnackBar('Fallo al otorgar permiso', 'OK');
      });
    }
    if(!permiso.activo) {
      this.permisoService.deletePermiso(datos).subscribe(res => {
        this.log('Remover permiso', `Usuario ${this.user} eliminó la ruta ${permiso.nombre} al rol ${datos.rol_id}`);
        this.openSnackBar('Permiso removido', 'OK');
        this.traerPermisos();
      },(error) => {
        this.log('Remover permiso', `Usuario ${this.user} falló al quitar la ruta ${permiso.nombre} al rol ${datos.rol_id}`);
        this.traerPermisos();
        this.openSnackBar('Fallo al remover permiso', 'OK');
      });
    }
  }
}
