import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaCreateComponent } from '../categoria-create/categoria-create.component';

@Component({
  selector: 'app-evento-participacion-create',
  templateUrl: './evento-participacion-create.component.html',
  styleUrls: ['./evento-participacion-create.component.scss']
})
export class EventoParticipacionCreateComponent {
  form = {
    idEvento: '',
    cedula: '',
    nombres: '',
    apellidos: '',
    fechaIni: '',
    fechaFin: '',
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<CategoriaCreateComponent>
  ) { }

  ngOnInit() {
    this.form = {
      idEvento: this.data.id,
      cedula: '',
      nombres: '',
      apellidos: '',
      fechaIni: this.data.fechaInicio,
      fechaFin: this.data.fechaFin,
    }
  }

  registrarParticipacion() {
    console.log(this.form);
    this.cerrar();
  }

  cerrar() {
    this.dialogRef.close();
  }
}
