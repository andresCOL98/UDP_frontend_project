import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Categoria } from 'src/app/domain/categoria';
import { Controlinventario } from 'src/app/domain/controlinventario';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ControlinventarioService } from 'src/app/service/controlinventario.service';
import { ItemService } from 'src/app/service/item.service';
import { LoadingService } from 'src/app/service/loading.service';
import { LogService } from 'src/app/service/log.service';
import { CategoriaCreateComponent } from '../../Create/categoria-create/categoria-create.component';

@Component({
  selector: 'app-control-inventario',
  templateUrl: './control-inventario.component.html',
  styleUrls: ['./control-inventario.component.scss']
})
export class ControlInventarioComponent {
  user = 'virtualo' //localStorage.getItem('currentUser');
  public inventario = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'nombre', 'transaccion', 'cantidad', 'fecha'];
  @ViewChild('paginator') paginator:any = MatPaginator;
  @ViewChild(MatSort, { static: true }) sort:any = MatSort;
  items:any;

  form:any = {
    item: '',
    actual: '',
    transaccion: '',
    cantidad: ''
  }
  
  constructor(
    public dialog: MatDialog,
    private loading:LoadingService,
    private snackBar: MatSnackBar,
    private itemService:ItemService,
    private inventarioService:ControlinventarioService,
    private logService:LogService
  ) {}

  ngAfterViewInit(): void {
    this.inventario.paginator = this.paginator;
    this.inventario.sort = this.sort
  }

  ngOnInit():void {
    this.traerItems();
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

  traerItems() {
    this.loading.cargando.next(true);
    this.itemService.getItems(true).subscribe((res:any) => {
      this.items = res;
      this.loading.cargando.next(false);
    }, (error) => {
      this.snackBar.open('Error al traer la lista de items', undefined, {duration: 4000});
      this.loading.cargando.next(false);
    });
  }

  traerTransaccionesItem() {
    let seleccionado = this.items.filter((res:any) => res.id == this.form.item);
    this.form.actual = seleccionado[0].cantidad;

    this.loading.cargando.next(true);
    this.inventarioService.getInventarioByItem(this.form.item).subscribe((res:any) => {
      this.inventario.data = res;
      this.loading.cargando.next(false);
    }, (error) => {
      this.snackBar.open('Error al traer las transacciones del item seleccionado', undefined, {duration: 4000});
      this.loading.cargando.next(false);
    });
  }

  registrarTransaccion() {
    this.loading.cargando.next(true);
    let data:Controlinventario = {
      id: 0,
      id_item: this.form.item,
      transaccion: this.form.transaccion,
      cantidad: this.form.cantidad,
      fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
      concepto: this.form.concepto
    }
    
    this.inventarioService.createInventario(data).subscribe((res:any) => {
      this.snackBar.open('Registro creado exitosamente', undefined, {duration: 4000})
      this.loading.cargando.next(false);
      this.log('Registrar transacción', `Usuario ${this.user} ingresó ${data.cantidad} unidades al item ${data.id_item}`);
    }, (error) => {
      this.snackBar.open('Error al traer las transacciones del item seleccionado', undefined, {duration: 4000});
      this.loading.cargando.next(false);
      this.log('Registrar transacción', `Usuario ${this.user} falló al ingresar ${data.cantidad} unidades al item ${data.id_item}`);
    });
  }
}
