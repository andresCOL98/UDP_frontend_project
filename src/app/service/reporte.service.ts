import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reporte } from '../domain/reporte';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getRerporteInventario() {
    let url = this.api + "inventario/inventarios/reports";
    return url;
  }

  asistenciaPorArea(fecha_inicio:string="", fecha_fin:string="", periodo_academico_id:number=0, subcategoria_id:number=0) {
    let url = this.api + "asistencias/asistenciasubcategoria/findByFechaCategoriaPeriodo" ;
    let data = {fecha_inicio, fecha_fin, periodo_academico_id, subcategoria_id};
    return this.httpClient.post(url, data);
  }

  atencionMedica(fecha_inicio:string="", fecha_fin:string="", periodo_academico_id:number=0) {
    let url = this.api + "asistencias/asistenciamedica/findByFechaPeriodoAcademico" ;
    let data = {fecha_inicio, fecha_fin, periodo_academico_id};
    return this.httpClient.post(url, data);
  }

  controlInventario(fecha_inicio:string="", fecha_fin:string="", periodo_academico_id:number=0, id_item:number=0) {
    let url = this.api + "inventario/controlInventario/findBySubcategoriaFechaPeriodoAcademico" ;
    let data = {fecha_inicio, fecha_fin, periodo_academico_id, id_item};
    return this.httpClient.post(url, data);
  }

  evento(fecha_inicio_primero:string="", fecha_inicio_segundo:string="", periodo_academico_id:number=0, subcategoria_id:number=0) {
    let url = this.api + "evento/eventos/findByFechaCategoriaPeriodo" ;
    let data = {fecha_inicio_primero, fecha_inicio_segundo, periodo_academico_id, subcategoria_id};
    return this.httpClient.post(url, data);
  }

  asistenciaEvento(fecha_inicio:string="", fecha_fin:string="", periodo_academico_id:number=0, evento_id:number=0) {
    let url = this.api + "evento/eventos/findByFechaCategoriaEvento" ;
    let data = {fecha_inicio, fecha_fin, periodo_academico_id, evento_id};
    return this.httpClient.post(url, data);
  }

  crearReporte(reporte:Reporte){
    let url = this.api + "reporte/reportes/save";
    return this.httpClient.post(url, reporte)
  }

  
}
