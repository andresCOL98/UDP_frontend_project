import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsistenciaeventoCreateComponent } from './component/asistenciaevento-create/asistenciaevento-create.component';
import { AsistenciamedicaCreateComponent } from './component/asistenciamedica-create/asistenciamedica-create.component';
import { AsistenciasubcategoriaCreateComponent } from './component/create/asistenciasubcategoria-create/asistenciasubcategoria-create.component';
import { CategoriaCreateComponent } from './component/create/categoria-create/categoria-create.component';
import { CategoriausuarioCreateComponent } from './component/create/categoriausuario-create/categoriausuario-create.component';
import { EventoCreateComponent } from './component/create/evento-create/evento-create.component';
import { InventarioCreateComponent } from './component/create/inventario-create/inventario-create.component';
import { InventarioitemCreateComponent } from './component/create/inventarioitem-create/inventarioitem-create.component';
import { ItemCreateComponent } from './component/create/item-create/item-create.component';
import { PeriodoacademicoCreateComponent } from './component/create/periodoacademico-create/periodoacademico-create.component';
import { PermisoCreateComponent } from './component/create/permiso-create/permiso-create.component';
import { ReporteCreateComponent } from './component/create/reporte-create/reporte-create.component';
import { CategoriaListComponent } from './component/list/categoria-list/categoria-list.component';
import { CategoriaEditComponent } from './component/edit/categoria-edit/categoria-edit.component';
import { InventarioEditComponent } from './component/edit/inventario-edit/inventario-edit.component';
import { ItemEditComponent } from './component/edit/item-edit/item-edit.component';
import { InventarioListComponent } from './component/list/inventario-list/inventario-list.component';
import { ItemListComponent } from './component/list/item-list/item-list.component';
import { EventoListComponent } from './component/list/evento-list/evento-list.component';
import { ReporteListComponent } from './component/list/reporte-list/reporte-list.component';
import { PeriodoacademicoListComponent } from './component/list/periodoacademico-list/periodoacademico-list.component';
import { RolListComponent } from './component/list/rol-list/rol-list.component';
import { RolCreateComponent } from './component/create/rol-create/rol-create.component';
import { PermisoListComponent } from './component/list/permiso-list/permiso-list.component';
import { PermisoEditComponent } from './component/edit/permiso-edit/permiso-edit.component';
import { RolEditComponent } from './component/edit/rol-edit/rol-edit.component';
import { PeriodoacademicoEditComponent } from './component/edit/periodoacademico-edit/periodoacademico-edit.component';
import { EventoEditComponent } from './component/edit/evento-edit/evento-edit.component';
import { LoginComponent } from './component/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AsistenciaeventoCreateComponent,
    AsistenciamedicaCreateComponent,
    AsistenciasubcategoriaCreateComponent,
    CategoriaCreateComponent,
    CategoriausuarioCreateComponent,
    EventoCreateComponent,
    InventarioCreateComponent,
    InventarioitemCreateComponent,
    ItemCreateComponent,
    PeriodoacademicoCreateComponent,
    PermisoCreateComponent,
    ReporteCreateComponent,
    CategoriaListComponent,
    CategoriaEditComponent,
    InventarioEditComponent,
    ItemEditComponent,
    InventarioListComponent,
    ItemListComponent,
    EventoListComponent,
    ReporteListComponent,
    PeriodoacademicoListComponent,
    RolListComponent,
    RolCreateComponent,
    PermisoListComponent,
    PermisoEditComponent,
    RolEditComponent,
    PeriodoacademicoEditComponent,
    EventoEditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
