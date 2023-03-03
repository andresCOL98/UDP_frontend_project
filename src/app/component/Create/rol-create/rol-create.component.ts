import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rol-create',
  templateUrl: './rol-create.component.html',
  styleUrls: ['./rol-create.component.scss']
})
export class RolCreateComponent  implements OnInit{

  nombreRol:string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<RolCreateComponent>
  ) { }

  ngOnInit(): void {
  }

  crearRol() {
    console.log(this.nombreRol);
    this.cerrar();
  }

  cerrar() {
    this.dialogRef.close();
  }
}

