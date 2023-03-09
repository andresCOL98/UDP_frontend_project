import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from 'src/app/domain/categoria';
import { Inventario } from 'src/app/domain/inventario';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ItemService } from 'src/app/service/item.service';
import { LoadingService } from 'src/app/service/loading.service';
import { CategoriaCreateComponent } from '../categoria-create/categoria-create.component';


@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss']
})
export class ItemCreateComponent implements OnInit {
  
  nombreItem:string = '';
  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);
  subcategoria_id:number=0;
  cantidad:number=0;
  estado:boolean=true;
  activos:boolean = true;
  public listaCategorias: Categoria[];

  public inventario:Inventario;



  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<ItemCreateComponent>,
    private itemService: ItemService,
    private snackBar: MatSnackBar,
    private loading: LoadingService,
    private categoriaService:CategoriaService
  ) { }

  ngOnInit(): void {
    this.nombreItem = this.data.item || '';
    this.subcategoria_id=this.data.subcategoria_id || '';
    this.cantidad=this.data.cantidad || '';

    this.getListaCategorias();

  }

  public getListaCategorias() {
    this.categoriaService.getCategorias(this.activos).subscribe((res:any) => {
      this.listaCategorias = res;
    })
  }

  

  crearItem() {
    if(this.nombreItem.length < 2) return this.snackBar.open('Inserte un nombre válido', undefined, {duration: 3000});
    if(this.cantidad <= 0) return this.snackBar.open('Inserte un nombre válido', undefined, {duration: 3000});
    if(this.nombreItem.length < 4) return this.snackBar.open('Inserte un nombre válido', undefined, {duration: 3000});

    let datosInventario={
      id: this.data.id,
      fecha: this.hoy.toLocaleDateString(),
      subcategoria_id:this.subcategoria_id,
      item:this.nombreItem,
      cantidad:this.cantidad,
      estado:true

    };
    this.loading.cargando.next(true);
    this.itemService.createItem(datosInventario).subscribe(res => {
      this.snackBar.open('Creado exitosamente', undefined, {duration: 3000});
      this.dialogRef.close(true);
    },(error) => {
      this.snackBar.open('Ha fallado la creación del item', undefined, {duration: 3000});
    })
    return this.loading.cargando.next(false);
  }

  editarItem() {
    if(this.nombreItem.length < 2) return this.snackBar.open('Inserte un nombre válido', undefined, {duration: 3000});
    if(this.cantidad <= 0) return this.snackBar.open('Inserte un nombre válido', undefined, {duration: 3000});
    if(this.nombreItem.length < 4) return this.snackBar.open('Inserte un nombre válido', undefined, {duration: 3000});

    let datosInventario={
      id: this.data.id,
      fecha: this.data.fecha,
      subcategoria_id:this.subcategoria_id,
      item:this.nombreItem,
      cantidad:this.cantidad,
      estado:this.data.estado

    };

    this.loading.cargando.next(true);

    this.itemService.updateItem(datosInventario).subscribe(res => {
      this.snackBar.open('Actualizado exitosamente', undefined, {duration: 3000});
      this.dialogRef.close(true);
    },(error) => {
      this.snackBar.open('Ha fallado la actualización del inventario', undefined, {duration: 3000});
    })
    return this.loading.cargando.next(false);
  }
}

