import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Categoria } from 'src/app/domain/categoria';
import { Inventario } from 'src/app/domain/inventario';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ItemService } from 'src/app/service/item.service';
import { LoadingService } from 'src/app/service/loading.service';
import { LogService } from 'src/app/service/log.service';
import { CategoriaCreateComponent } from '../categoria-create/categoria-create.component';


@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss']
})
export class ItemCreateComponent implements OnInit {
  
  nombreItem:string = '';
  tiempoTranscurrido = Date.now();
  subcategoria_id:any = '';
  cantidad:number = 0;
  estado:boolean = true;
  activos:boolean = true;
  user=localStorage.getItem('currentUser');
  public listaCategorias: Categoria[];

  public inventario:Inventario;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<ItemCreateComponent>,
    private itemService: ItemService,
    private snackBar: MatSnackBar,
    private loading: LoadingService,
    private categoriaService:CategoriaService,
    private logService:LogService
  ) { }

  ngOnInit(): void {
    this.nombreItem = this.data.item || '';
    this.subcategoria_id=this.data.subcategoria_id || '';
    this.cantidad=this.data.cantidad || '';

    this.getListaCategorias();

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

  public getListaCategorias() {
    this.categoriaService.getCategorias(this.activos).subscribe((res:any) => {
      this.listaCategorias = res;
    })
  }

  crearItem() {
    if(this.nombreItem.length < 4) return this.snackBar.open('Inserte un nombre válido', undefined, {duration: 3000});
    if(!this.subcategoria_id) return this.snackBar.open('Seleccione una categoría', undefined, {duration: 3000});

    let datosInventario = {
      id: this.data.id,
      fecha: moment().format('YYYY-MM-DD'),
      subcategoria_id:this.subcategoria_id,
      item:this.nombreItem,
      cantidad:0,
      estado:true

    };
    this.loading.cargando.next(true);
    this.itemService.createItem(datosInventario).subscribe(res => {
      this.snackBar.open('Creado exitosamente', undefined, {duration: 3000});
      this.loading.cargando.next(false);
      this.dialogRef.close(true);
      this.log("Crear item inventario",`Usuario: ${this.user} creó el item en inventario con datos: ${JSON.stringify(datosInventario)}`);
    },(error) => {
      this.log("Crear item inventario",`Usuario: ${this.user} falló al crear el item en inventario con datos: ${JSON.stringify(datosInventario)}`);
      this.snackBar.open('Ha fallado la creación del item', undefined, {duration: 3000});
      this.loading.cargando.next(false);
    });
    
    return;
  }

  editarItem() {
    if(this.nombreItem.length < 4) return this.snackBar.open('Inserte un nombre válido', undefined, {duration: 3000});

    let datosInventario={
      id: this.data.id,
      fecha: this.data.fecha,
      subcategoria_id:this.subcategoria_id,
      item:this.nombreItem,
      cantidad:this.data.cantidad,
      estado:this.data.estado

    };

    this.loading.cargando.next(true);

    this.itemService.updateItem(datosInventario).subscribe(res => {
      this.snackBar.open('Actualizado exitosamente', undefined, {duration: 3000});
      this.log("Editar item inventario", `Usuario: ${this.user} editó el item en inventario: ${JSON.stringify(datosInventario)}`);
      this.dialogRef.close(true);
    },(error) => {
      this.log("Editar item inventario", `Usuario: ${this.user} falló al editar el item en inventario id: ${this.data.id}`);
      this.snackBar.open('Ha fallado la actualización del inventario', undefined, {duration: 3000});
    });

    return this.loading.cargando.next(false);
  }
}

