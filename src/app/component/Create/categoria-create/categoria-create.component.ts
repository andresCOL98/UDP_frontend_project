import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { CategoriaService } from 'src/app/service/categoria.service';
import { LoadingService } from 'src/app/service/loading.service';
import { LogService } from 'src/app/service/log.service';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.scss']
})
export class CategoriaCreateComponent implements OnInit {
  nombreCategoria:string = '';
  user=localStorage.getItem('currentUser');

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<CategoriaCreateComponent>,
    public snackBar:MatSnackBar,
    public categoriaService:CategoriaService,
    private loading: LoadingService,
    private logService:LogService
  ) { }

  ngOnInit(): void {
    this.nombreCategoria = this.data.nombre || '';
  }

  public openSnackBar(mesagge:string,action:string){
    this.snackBar.open(mesagge,action,{duration:3000});
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

  crearCategoria() {
    if(this.nombreCategoria.length < 3) return this.snackBar.open('Inserte un nombre válido', undefined, {duration: 3000});

    this.loading.cargando.next(true);

    this.categoriaService.createCategoria(this.nombreCategoria).subscribe(data=>{
      this.openSnackBar('Categoría creada exitosamente','Exito');
      this.dialogRef.close(true);
      this.log("Crear categoria","Usuario: " + this.user + " creo la categoría " + this.nombreCategoria);
      return this.loading.cargando.next(false);
    },error=>{
      this.snackBar.open('Ha fallado la creación de la categoría', undefined, {duration: 3000});
      this.log("Crear categoria","Usuario: " + this.user + " fallo al crear la categoría " + this.nombreCategoria);
      return this.loading.cargando.next(false);
    });
    return;
  }

  editarCategoria() {
    if(this.nombreCategoria.length < 3) return this.snackBar.open('Inserte un nombre válido', undefined, {duration: 3000});
    let datosCategoria = {
      id: this.data.id,
      nombre: this.nombreCategoria,
      estado: this.data.estado
    };

    this.loading.cargando.next(true);

    this.categoriaService.updateCategoria(datosCategoria).subscribe(res => {
      this.log("Editar categoria","Usuario: "+this.user+" edito la categoría " + this.data.id);
      this.snackBar.open('Actualizado exitosamente', undefined, {duration: 3000});
      this.dialogRef.close(true);
      return this.loading.cargando.next(false);
    },(error) => {
      this.snackBar.open('Ha fallado la actualización de la categoría', undefined, {duration: 3000});
      this.log("Editar categoria","Usuario: "+this.user+" fallo al editar la categoría " + this.data.id);
      return this.loading.cargando.next(false);
    });
    return;
  }
}
