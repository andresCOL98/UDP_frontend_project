import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.scss']
})
export class CategoriaCreateComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<CategoriaCreateComponent>
  ) { }

  ngOnInit(): void {
  }

  crearCategoria(nombre:string) {
    console.log(nombre);
    this.cerrar();
  }

  cerrar() {
    this.dialogRef.close();
  }
}
