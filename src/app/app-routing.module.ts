import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciasubcategoriaCreateComponent } from './component/Create/asistenciasubcategoria-create/asistenciasubcategoria-create.component';
import { CategoriaCreateComponent } from './component/Create/categoria-create/categoria-create.component';
import { ItemCreateComponent } from './component/Create/item-create/item-create.component';
import { IndexMenuComponent } from './component/index-menu/index-menu.component';
import { CategoriaListComponent } from './component/List/categoria-list/categoria-list.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'index-menu', component: IndexMenuComponent},
  { path: 'registrar-asistencias', component: AsistenciasubcategoriaCreateComponent},
  { path: 'crear-categorias', component: CategoriaCreateComponent},
  { path: 'ver-categorias', component: CategoriaListComponent},
  { path: 'registrar-items', component: ItemCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
