import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-eventos',
  templateUrl: './dialogo-eventos.component.html',
  styleUrls: ['./dialogo-eventos.component.scss']
})
export class DialogoEventosComponent {
  eventos:any;
  eventosFiltrados:any;
  filtro = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<DialogoEventosComponent>
  ) { }

  ngOnInit(): void {
    this.eventos = this.data.eventos;
    this.filtrarNombre();
  }

  filtrarNombre() {
    this.eventosFiltrados = this.eventos.filter((res:any) => res.nombre.toLowerCase().indexOf(this.filtro) > -1);
  }

  seleccionar(id:number, nombre:string) {
    this.dialogRef.close({id, nombre});
  }
}
