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
import { EventoInformeCreateComponent } from './component/Create/evento-informe-create/evento-informe-create.component';
import { NotificacionDialogoComponent } from './component/core/notificacion-dialogo/notificacion-dialogo.component';
import { UsuariosCreateComponent } from './component/Create/usuarios-create/usuarios-create.component';
import { UsuariosListComponent } from './component/List/usuarios-list/usuarios-list.component';
import { ControlInventarioComponent } from './component/List/control-inventario/control-inventario.component';
import { DialogoEventosComponent } from './component/List/reporte-list/dialogo-eventos/dialogo-eventos.component';
import { AsistenciaCategoriaReportComponent } from './component/reports/asistencia-categoria-report/asistencia-categoria-report.component';
import { EventosReportComponent } from './component/reports/eventos-report/eventos-report.component';
import { AsistenciaEventosReportComponent } from './component/reports/asistencia-eventos-report/asistencia-eventos-report.component';
import { ControlInventarioReportComponent } from './component/reports/control-inventario-report/control-inventario-report.component';
import { InventarioReportComponent } from './component/reports/inventario-report/inventario-report.component';
import { AsistenciaMedicaReportComponent } from './component/reports/asistencia-medica-report/asistencia-medica-report.component';

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
    RutaCreateComponent,
    EventoInformeCreateComponent,
    NotificacionDialogoComponent,
    UsuariosCreateComponent,
    UsuariosListComponent,
    ControlInventarioComponent,
    DialogoEventosComponent,
    AsistenciaCategoriaReportComponent,
    EventosReportComponent,
    AsistenciaEventosReportComponent,
    ControlInventarioReportComponent,
    InventarioReportComponent,
    AsistenciaMedicaReportComponent
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
