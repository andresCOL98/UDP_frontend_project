import { Component } from '@angular/core';

@Component({
  selector: 'app-asistenciasubcategoria-create',
  templateUrl: './asistenciasubcategoria-create.component.html',
  styleUrls: ['./asistenciasubcategoria-create.component.scss']
})
export class AsistenciasubcategoriaCreateComponent {

  form = {
    cedula: null,
    nombres: '',
    apellidos: '',
    categoria: '',
    fecha: '',
    hora: ''
  }

  categorias = [
    {value: '', name:"Seleccionar..."},
    {value: 1, name:"Deportes"},
    {value: 2, name:"Orquestas"},
    {value: 3, name:"Gimnasio"},
    {value: 4, name:"Danzas"},
  ];

  constructor() {}

  ngOnInit() {
  }

  registrarAsistencia() {
    console.log(this.form);
  }

  limpiarCampos() {
    this.form = {
      cedula: null,
      nombres: '',
      apellidos: '',
      categoria: '',
      fecha: '',
      hora: ''
    }
  }
}
