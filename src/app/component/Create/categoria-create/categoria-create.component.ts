import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from 'src/app/domain/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.scss']
})
export class CategoriaCreateComponent implements OnInit {
  nombreCategoria:string = '';
  

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<CategoriaCreateComponent>,
    public snackBar:MatSnackBar,
    public categoriaService:CategoriaService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {
    this.nombreCategoria = this.data.nombre || '';
  }

  public openSnackBar(mesagge:string,action:string){
    this.snackBar.open(mesagge,action,{duration:3000});
  }

  crearCategoria() {
    if(this.nombreCategoria.length < 3) return this.snackBar.open('Inserte un nombre válido', undefined, {duration: 3000});

    this.loading.cargando.next(true);

    this.categoriaService.createCategoria(this.nombreCategoria).subscribe(data=>{
      this.openSnackBar('Categoría creada exitosamente','Exito');
      this.dialogRef.close(true);
    },error=>{
      this.snackBar.open('Ha fallado la creación de la categoría', undefined, {duration: 3000});
    })
    return this.loading.cargando.next(false);

  
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
      this.snackBar.open('Actualizado exitosamente', undefined, {duration: 3000});
      this.dialogRef.close(true);
    },(error) => {
      this.snackBar.open('Ha fallado la actualización de la categoría', undefined, {duration: 3000});
    })
    return this.loading.cargando.next(false);
  }

  cerrar() {
    this.dialogRef.close();
  }
}
