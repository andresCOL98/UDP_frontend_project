import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/service/login.service';
import { PermisoService } from 'src/app/service/permiso.service';
import { RutaService } from 'src/app/service/ruta.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isLoggedUser: any;
  usuario = '';
  open = true;
  rol:number;
  rutas:any;
  permisos:any;
  menus:any = [];

  constructor(
    private loginService:LoginService,
    private permisoService:PermisoService,
    private rutaService:RutaService,
    private snackBar:MatSnackBar
  ) { }

  ngOnInit() {
    this.usuario = this.loginService.getUserLoggedIn();
    this.onWindowResize();

    this.loginService.getUserRol().subscribe(res => {
      this.rol = res;
      if(this.rol != 0) this.traerRutas();
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if(window.innerWidth < 768) {
      this.open = false;
    } else {
      this.open = true;
    }
  }

  traerRutas() {
    this.rutaService.getRutas().subscribe((res:any) => {
      this.rutas = res;
      this.traerPermisos();
    }, (error) => {
      this.snackBar.open('Error al traer las rutas del menú', undefined, {duration: 4000});
    });
  }

  traerPermisos() {
    this.permisoService.getPermisoByRol(this.rol).subscribe((res:any) => {
      this.permisos = res;
      this.relacionarRutasRol();
    }, (error) => {
      this.snackBar.open('Error al traer los permisos del rol', undefined, {duration: 4000});
    });
  }

  relacionarRutasRol() {
    this.menus = [
      {titulo: 'Inicio', subtitulos: []},
      {titulo: 'Asistencias', subtitulos: []},
      {titulo: 'Eventos', subtitulos: []},
      {titulo: 'Inventario', subtitulos: []},
      {titulo: 'Atención Médica y psicológica', subtitulos: []},
      {titulo: 'Reportes', subtitulos: []},
      {titulo: 'Configuración sistema', subtitulos: []}
    ];

    this.rutas.map((res:any) => {
      let existe = this.permisos.filter((per:any) => per.ruta_id == res.id);
      if(existe.length) {
        if(res.id == 1) this.menus[0].subtitulos.push({path: res.path, nombre: 'Página de inicio'});
        if(res.id == 2) this.menus[1].subtitulos.push({path: res.path, nombre: 'Registrar asistencias'});
        if(res.id == 4) this.menus[6].subtitulos.push({path: res.path, nombre: 'Administrar categorías'});
        if(res.id == 6) this.menus[3].subtitulos.push({path: res.path, nombre: 'Administrar inventario'});
        if(res.id == 7) this.menus[2].subtitulos.push({path: res.path, nombre: 'Registrar evento'});
        if(res.id == 8) this.menus[2].subtitulos.push({path: res.path, nombre: 'Cronograma de eventos'});
        if(res.id == 9) this.menus[6].subtitulos.push({path: res.path, nombre: 'Administrar roles'});
        if(res.id == 10) this.menus[6].subtitulos.push({path: res.path, nombre: 'Administrar rutas'});
        if(res.id == 11) this.menus[4].subtitulos.push({path: res.path, nombre: 'Registrar asistencia médica'});
        if(res.id == 12) this.menus[4].subtitulos.push({path: res.path, nombre: 'Historias médicas'});
        if(res.id == 13) this.menus[5].subtitulos.push({path: res.path, nombre: 'Generar reportes'});
        if(res.id == 14) this.menus[6].subtitulos.push({path: res.path, nombre: 'Periodos académicos'});
      }
    });
  }
  
  cerrarSesion() {
    this.loginService.logOut();
  }
}

 

