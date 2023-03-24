import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciamedicaCreateComponent } from './component/Create/asistenciamedica-create/asistenciamedica-create.component';
import { AsistenciasubcategoriaCreateComponent } from './component/Create/asistenciasubcategoria-create/asistenciasubcategoria-create.component';
import { CategoriaCreateComponent } from './component/Create/categoria-create/categoria-create.component';
import { EventoCreateComponent } from './component/Create/evento-create/evento-create.component';
import { ItemCreateComponent } from './component/Create/item-create/item-create.component';
import { IndexMenuComponent } from './component/index-menu/index-menu.component';
import { AsistenciamedicaListComponent } from './component/List/asistenciamedica-list/asistenciamedica-list.component';
import { CategoriaListComponent } from './component/List/categoria-list/categoria-list.component';
import { EventoListComponent } from './component/List/evento-list/evento-list.component';
import { ItemListComponent } from './component/List/item-list/item-list.component';
import { PeriodoacademicoListComponent } from './component/List/periodoacademico-list/periodoacademico-list.component';
import { ReporteListComponent } from './component/List/reporte-list/reporte-list.component';
import { RolListComponent } from './component/List/rol-list/rol-list.component';
import { RutaListComponent } from './component/List/ruta-list/ruta-list.component';
import { UsuariosListComponent } from './component/List/usuarios-list/usuarios-list.component';
import { LoginComponent } from './component/login/login.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { VerificarPermisoGuard } from './guards/verificar-permiso.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'index-menu', component: IndexMenuComponent, canActivate: [LoggedInGuard] },
  { path: 'registrar-asistencias', component: AsistenciasubcategoriaCreateComponent, canActivate: [LoggedInGuard, VerificarPermisoGuard] },
  { path: 'ver-categorias', component: CategoriaListComponent, canActivate: [LoggedInGuard, VerificarPermisoGuard] },
  { path: 'registrar-items', component: ItemCreateComponent, canActivate: [LoggedInGuard, VerificarPermisoGuard] },
  { path: 'ver-items', component: ItemListComponent, canActivate: [LoggedInGuard, VerificarPermisoGuard] },
  { path: 'registrar-eventos', component: EventoCreateComponent, canActivate: [LoggedInGuard, VerificarPermisoGuard] },
  { path: 'cronograma-eventos', component: EventoListComponent, canActivate: [LoggedInGuard, VerificarPermisoGuard] },
  { path: 'ver-roles', component: RolListComponent, canActivate: [LoggedInGuard, VerificarPermisoGuard] },
  { path: 'ver-rutas', component: RutaListComponent, canActivate: [LoggedInGuard, VerificarPermisoGuard] },
  { path: 'registrar-asistencia-medica', component: AsistenciamedicaCreateComponent, canActivate: [LoggedInGuard, VerificarPermisoGuard] },
  { path: 'historias-clinicas', component: AsistenciamedicaListComponent, canActivate: [LoggedInGuard, VerificarPermisoGuard] },
  { path: 'generar-reportes', component: ReporteListComponent, canActivate: [LoggedInGuard, VerificarPermisoGuard] },
  { path: 'ver-periodos', component: PeriodoacademicoListComponent, canActivate: [LoggedInGuard, VerificarPermisoGuard] },
  { path: 'ver-usuarios', component: UsuariosListComponent, canActivate: [LoggedInGuard, VerificarPermisoGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
