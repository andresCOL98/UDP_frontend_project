import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forget-data',
  templateUrl: './forget-data.component.html',
  styleUrls: ['./forget-data.component.scss']
})
export class ForgetDataComponent implements OnInit{
  nombre:string='';
  cedula:any=null;
  detalle:string='';
  varidador:boolean=false;
 

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<ForgetDataComponent>,
    public matSnackBar:MatSnackBar
  ) { }

  ngOnInit() {
  }

  public openSnackBar(mesagge:string,action:string){
    this.matSnackBar.open(mesagge,action,{duration:3000});
  }

  validarForm(){
    if(this.nombre=='' || this.detalle=='' || this.cedula==null){
    }else{
      this.varidador=true;
    }

    return this.varidador;
  }

  enviarForm() {

    this.validarForm();
    if(this.varidador==true){
      window.open('mailto:avas@unipacifico.edu.co?Subject=Recuperar%20cuenta%20UDP&body=Hola, perdí el acceso a mi cuenta. NOMBRE:'+this.nombre+', CEDULA:'+this.cedula+', DETALLE:'+this.detalle,'_blank');
      this.cerrar();
    }else{
      this.openSnackBar('Verifique los campos','Error');
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
}
