import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-forget-data',
  templateUrl: './forget-data.component.html',
  styleUrls: ['./forget-data.component.scss']
})
export class ForgetDataComponent implements OnInit{
  nombre:string='';
  cedula:number=0;
  detalle:string='';
  msj:string='';

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<ForgetDataComponent>
  ) { }

  ngOnInit() {
  }

  enviarForm() {
    this.msj="Hola necesito recuperar acceso a mi cuenta, mi nombres es: "+this.nombre+", mi cédula: "+this.cedula+", detalles: "+this.detalle;
    this.cerrar();
  }

  cerrar() {
    this.dialogRef.close();
  }
}
