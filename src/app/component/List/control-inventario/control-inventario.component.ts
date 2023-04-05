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
import { PeriodoacademicoService } from 'src/app/service/periodoacademico.service';

@Component({
  selector: 'app-control-inventario',
  templateUrl: './control-inventario.component.html',
  styleUrls: ['./control-inventario.component.scss']
})
export class ControlInventarioComponent {
  user = localStorage.getItem('currentUser');
  public inventario = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'item', 'transaccion', 'cantidad', 'concepto', 'fecha'];
  @ViewChild('paginator') paginator:any = MatPaginator;
  @ViewChild(MatSort, { static: true }) sort:any = MatSort;
  items:any;
  periodos:any;
  categorias:any;

  form:any = {
    item: '',
    actual: '',
    transaccion: '',
    cantidad: '',
    concepto: '',
    periodo: ''
  }
  
  constructor(
    public dialog: MatDialog,
    private loading:LoadingService,
    private snackBar: MatSnackBar,
    private itemService:ItemService,
    private inventarioService:ControlinventarioService,
    private logService:LogService,
    private periodoService:PeriodoacademicoService,
    private categoriaService:CategoriaService
  ) {}

  ngAfterViewInit(): void {
    this.inventario.paginator = this.paginator;
    this.inventario.sort = this.sort
  }

  ngOnInit():void {
    this.traerItems();
    this.traerPeriodos();
  }

  traerPeriodos() {
    this.periodoService.getPeriodosAcademicos(true).subscribe((res:any) => {
      this.periodos = res;
    },(error) => {
      this.snackBar.open('Error al mostrar los periodos académicos', undefined, {duration: 3000});
    })
  }

  traerCategorias() {
    this.categoriaService.getCategorias(true).subscribe((res:any) => {
      this.items.map((item:any) => {
        let catego = res.filter((cate:any) => cate.id == item.subcategoria_id)
        item.item += ` (${catego[0].nombre})`
      });
      this.loading.cargando.next(false);
    }, (error) => {
      this.snackBar.open('Error al traer los datos de la tabla', undefined, {duration: 4000});
    });
  }

  log(evento:string,mensaje:string){
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
      this.traerCategorias();
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
      if(!res.length) {
        this.inventario.data = [];
      } else {
        res.map((res:any) => {
          let item = this.items.filter((elem:any) => elem.id == res.id_item);
          res.nombreItem = item[0].item;
        });
        this.inventario.data = res;
      }
      this.loading.cargando.next(false);
    }, (error) => {
      this.snackBar.open('Error al traer las transacciones del item seleccionado', undefined, {duration: 4000});
      this.loading.cargando.next(false);
    });
  }

  registrarTransaccion() {
    let data:Controlinventario = {
      id: 0,
      id_item: this.form.item,
      transaccion: this.form.transaccion,
      cantidad: this.form.cantidad,
      fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
      concepto: this.form.concepto,
      periodo_academico_id: this.form.periodo
    }

    if(data.cantidad < 0) return this.snackBar.open('Ingrese una cantidad válida', 'OK', {duration: 4000})
    if(data.transaccion == 'Salida' && this.form.actual < data.cantidad) return this.snackBar.open('No puede sacar más items de los disponibles', 'OK', {duration: 5000});
    if(data.transaccion != 'Salida' && data.transaccion != 'Entrada') return;

    if(!data.id_item || !data.transaccion || !data.cantidad || !data.concepto || !data.periodo_academico_id) {
      return this.snackBar.open('Debe diligenciar todos los campos', undefined, {duration: 4000});
    }

    this.loading.cargando.next(true);
    this.inventarioService.createInventario(data).subscribe((res:any) => {
      this.snackBar.open('Registro creado exitosamente', undefined, {duration: 4000})
      this.loading.cargando.next(false);
      this.log('Registrar transacción', `Usuario ${this.user} ingresó ${data.cantidad} unidades al item ${data.id_item}`);
      this.limpiar();
      this.traerItems();
      this.traerTransaccionesItem();
    }, (error) => {
      this.snackBar.open('Error al crear la transacción', undefined, {duration: 4000});
      this.loading.cargando.next(false);
      this.log('Registrar transacción', `Usuario ${this.user} falló al ingresar ${data.cantidad} unidades al item ${data.id_item}`);
    });
    return;
  }

  limpiar() {
    this.form = {
      item: '',
      actual: '',
      transaccion: '',
      cantidad: '',
      concepto: '',
      periodo: ''
    }
  }
}
