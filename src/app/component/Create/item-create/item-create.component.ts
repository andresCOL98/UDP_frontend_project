import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaCreateComponent } from '../categoria-create/categoria-create.component';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss']
})
export class ItemCreateComponent implements OnInit {
  form = {
    nombre: '',
    cantidad: null,
    categoria: ''
  }

  categorias = [
    {value: '', name:"Seleccionar..."},
    {value: 1, name:"Deportes"},
    {value: 2, name:"Orquestas"},
    {value: 3, name:"Gimnasio"},
    {value: 4, name:"Danzas"},
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<CategoriaCreateComponent>
  ) { }

  ngOnInit() {
  }

  crearItem() {
    console.log(this.form);
    this.cerrar();
  }

  cerrar() {
    this.dialogRef.close();
  }
}
