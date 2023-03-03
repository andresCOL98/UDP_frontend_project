import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-forget-data',
  templateUrl: './forget-data.component.html',
  styleUrls: ['./forget-data.component.scss']
})
export class ForgetDataComponent implements OnInit{
  nombre:string='';
  cedula:any=null;
  detalle:string='';
 

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<ForgetDataComponent>
  ) { }

  ngOnInit() {
  }

  enviarForm() {
    window.open('mailto:os-w316@hotmail.com?Subject=Recuperar%20cuenta%20UDP&body=Hola perdí el acceso a mi cuenta. NOMBRE:'+this.nombre+', CEDULA:'+this.cedula+', DETALLE:'+this.detalle,'_blank');
    this.cerrar();
  }

  cerrar() {
    this.dialogRef.close();
  }
}
