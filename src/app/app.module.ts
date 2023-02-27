import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { AsistenciaeventoCreateComponent } from './component/Create/asistenciaevento-create/asistenciaevento-create.component';
import { AsistenciamedicaCreateComponent } from './component/Create/asistenciamedica-create/asistenciamedica-create.component';
import { AsistenciasubcategoriaCreateComponent } from './component/Create/asistenciasubcategoria-create/asistenciasubcategoria-create.component';
import { CategoriaCreateComponent } from './component/Create/categoria-create/categoria-create.component';
import { EventoCreateComponent } from './component/Create/evento-create/evento-create.component';
import { InventarioCreateComponent } from './component/Create/inventario-create/inventario-create.component';
import { ItemCreateComponent } from './component/Create/item-create/item-create.component';
import { PeriodoacademicoCreateComponent } from './component/Create/periodoacademico-create/periodoacademico-create.component';
import { PermisoCreateComponent } from './component/Create/permiso-create/permiso-create.component';
import { ReporteCreateComponent } from './component/Create/reporte-create/reporte-create.component';
import { CategoriaListComponent } from './component/List/categoria-list/categoria-list.component';
import { CategoriaEditComponent } from './component/Edit/categoria-edit/categoria-edit.component';
import { InventarioEditComponent } from './component/Edit/inventario-edit/inventario-edit.component';
import { ItemEditComponent } from './component/Edit/item-edit/item-edit.component';
import { InventarioListComponent } from './component/List/inventario-list/inventario-list.component';
import { ItemListComponent } from './component/List/item-list/item-list.component';
import { EventoListComponent } from './component/List/evento-list/evento-list.component';
import { ReporteListComponent } from './component/List/reporte-list/reporte-list.component';
import { PeriodoacademicoListComponent } from './component/List/periodoacademico-list/periodoacademico-list.component';
import { RolListComponent } from './component/List/rol-list/rol-list.component';
import { RolCreateComponent } from './component/Create/rol-create/rol-create.component';
import { PermisoListComponent } from './component/List/permiso-list/permiso-list.component';
import { PermisoEditComponent } from './component/Edit/permiso-edit/permiso-edit.component';
import { RolEditComponent } from './component/Edit/rol-edit/rol-edit.component';
import { PeriodoacademicoEditComponent } from './component/Edit/periodoacademico-edit/periodoacademico-edit.component';
import { EventoEditComponent } from './component/Edit/evento-edit/evento-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexMenuComponent } from './component/index-menu/index-menu.component';
import { SidebarComponent } from './component/core/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    AsistenciaeventoCreateComponent,
    AsistenciamedicaCreateComponent,
    AsistenciasubcategoriaCreateComponent,
    CategoriaCreateComponent,
    EventoCreateComponent,
    InventarioCreateComponent,
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
    LoginComponent,
    IndexMenuComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
