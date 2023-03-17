import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { AsistenciamedicaCreateComponent } from './component/Create/asistenciamedica-create/asistenciamedica-create.component';
import { AsistenciasubcategoriaCreateComponent } from './component/Create/asistenciasubcategoria-create/asistenciasubcategoria-create.component';
import { CategoriaCreateComponent } from './component/Create/categoria-create/categoria-create.component';
import { EventoCreateComponent } from './component/Create/evento-create/evento-create.component';
import { ItemCreateComponent } from './component/Create/item-create/item-create.component';
import { PeriodoacademicoCreateComponent } from './component/Create/periodoacademico-create/periodoacademico-create.component';
import { PermisoCreateComponent } from './component/Create/permiso-create/permiso-create.component';
import { CategoriaListComponent } from './component/List/categoria-list/categoria-list.component';
import { ItemListComponent } from './component/List/item-list/item-list.component';
import { EventoListComponent } from './component/List/evento-list/evento-list.component';
import { ReporteListComponent } from './component/List/reporte-list/reporte-list.component';
import { PeriodoacademicoListComponent } from './component/List/periodoacademico-list/periodoacademico-list.component';
import { RolListComponent } from './component/List/rol-list/rol-list.component';
import { RolCreateComponent } from './component/Create/rol-create/rol-create.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexMenuComponent } from './component/index-menu/index-menu.component';
import { SidebarComponent } from './component/core/sidebar/sidebar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ForgetDataComponent } from './component/forget-data/forget-data.component';
import { EventoParticipacionCreateComponent } from './component/Create/evento-participacion-create/evento-participacion-create.component';
import { AsistenciamedicaListComponent } from './component/List/asistenciamedica-list/asistenciamedica-list.component';
import { RutaListComponent } from './component/List/ruta-list/ruta-list.component';
import { RutaCreateComponent } from './component/Create/ruta-create/ruta-create.component';

@NgModule({
  declarations: [
    AppComponent,
    AsistenciamedicaCreateComponent,
    AsistenciasubcategoriaCreateComponent,
    CategoriaCreateComponent,
    EventoCreateComponent,
    ItemCreateComponent,
    PeriodoacademicoCreateComponent,
    PermisoCreateComponent,
    CategoriaListComponent,
    ItemListComponent,
    EventoListComponent,
    ReporteListComponent,
    PeriodoacademicoListComponent,
    RolListComponent,
    RolCreateComponent,
    LoginComponent,
    IndexMenuComponent,
    SidebarComponent,
    ForgetDataComponent,
    EventoParticipacionCreateComponent,
    AsistenciamedicaListComponent,
    RutaListComponent,
    RutaCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
