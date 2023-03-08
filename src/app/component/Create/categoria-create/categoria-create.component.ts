import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from 'src/app/domain/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.scss']
})
export class CategoriaCreateComponent implements OnInit {
  nombreCategoria:string = '';

  categoria:Categoria=new Categoria(0,false,"");
  showMsg:boolean=false;
  msj:string="";

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<CategoriaCreateComponent>,
    public matSnackBar:MatSnackBar,
    public categoriaService:CategoriaService
  ) { }

  ngOnInit(): void {
    this.categoria=new Categoria(0,false,"");
  }

  public openSnackBar(mesagge:string,action:string){
    this.matSnackBar.open(mesagge,action,{duration:3000});
  }

  crearCategoria() {
    this.categoriaService.createCategoria(this.categoria).subscribe(data=>{
     
      this.openSnackBar('Categoría creada exitosamente','Exito');
      this.cerrar();
    },error=>{
      this.openSnackBar(error.error.mensaje,'Error');
    }

    );
  
  }

  cerrar() {
    this.dialogRef.close();
  }
}
