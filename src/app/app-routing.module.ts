import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciamedicaCreateComponent } from './component/Create/asistenciamedica-create/asistenciamedica-create.component';
import { AsistenciasubcategoriaCreateComponent } from './component/Create/asistenciasubcategoria-create/asistenciasubcategoria-create.component';
import { CategoriaCreateComponent } from './component/Create/categoria-create/categoria-create.component';
import { EventoCreateComponent } from './component/Create/evento-create/evento-create.component';
import { ItemCreateComponent } from './component/Create/item-create/item-create.component';
import { IndexMenuComponent } from './component/index-menu/index-menu.component';
import { CategoriaListComponent } from './component/List/categoria-list/categoria-list.component';
import { EventoListComponent } from './component/List/evento-list/evento-list.component';
import { ItemListComponent } from './component/List/item-list/item-list.component';
import { RolListComponent } from './component/List/rol-list/rol-list.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'index-menu', component: IndexMenuComponent},
  { path: 'registrar-asistencias', component: AsistenciasubcategoriaCreateComponent},
  { path: 'crear-categorias', component: CategoriaCreateComponent},
  { path: 'ver-categorias', component: CategoriaListComponent},
  { path: 'registrar-items', component: ItemCreateComponent},
  { path: 'ver-items', component: ItemListComponent},
  { path: 'registrar-eventos', component: EventoCreateComponent},
  { path: 'cronograma-eventos', component: EventoListComponent},
  { path: 'ver-roles', component: RolListComponent},
  { path: 'registrar-asistencia-medica', component: AsistenciamedicaCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
