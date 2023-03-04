import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { EventoParticipacionCreateComponent } from '../../Create/evento-participacion-create/evento-participacion-create.component';

@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.component.html',
  styleUrls: ['./evento-list.component.scss']
})
export class EventoListComponent {
  form = {
    nombre: '',
    fecha: '',
    categoria: '',
  }

  categorias = [
    {value: '', name:"Seleccionar..."},
    {value: 1, name:"Deportes"},
    {value: 2, name:"Orquestas"},
    {value: 3, name:"Gimnasio"},
    {value: 4, name:"Danzas"},
  ];

  eventos = [
    {
      id: 1,
      titulo: 'CLASE DE SAXOFON',
      descripcion: 'Clases personalizadas saxofón desde las 9am hasta las 11pm los lunes, miércoles y viernes',
      fechaInicio: moment('2023-03-02', 'YYYY-MM-DD').format('DD/MM/YYYY'),
      fechaFin: moment('2023-03-23', 'YYYY-MM-DD').format('DD/MM/YYYY'),
    },
    {
      id: 2,
      titulo: 'CLASE DE TROMPETA',
      descripcion: 'Clases personalizadas trompeta desde las 9am hasta las 11pm los lunes, miércoles y viernes',
      fechaInicio: moment('2023-03-02', 'YYYY-MM-DD').format('DD/MM/YYYY'),
      fechaFin: moment('2023-03-23', 'YYYY-MM-DD').format('DD/MM/YYYY'),
    },
    {
      id: 3,
      titulo: 'CLASE DE CLARINETE',
      descripcion: 'Clases personalizadas clarinete desde las 9am hasta las 11pm los lunes, miércoles y viernes',
      fechaInicio: moment('2023-03-02', 'YYYY-MM-DD').format('DD/MM/YYYY'),
      fechaFin: moment('2023-03-23', 'YYYY-MM-DD').format('DD/MM/YYYY'),
    },
    {
      id: 4,
      titulo: 'CLASE DE BOMBO',
      descripcion: 'Clases personalizadas bombo desde las 9am hasta las 11pm los lunes, miércoles y viernes',
      fechaInicio: moment('2023-03-02', 'YYYY-MM-DD').format('DD/MM/YYYY'),
      fechaFin: moment('2023-03-23', 'YYYY-MM-DD').format('DD/MM/YYYY'),
    },
    {
      id: 5,
      titulo: 'CLASE DE MARIMBA',
      descripcion: 'Clases personalizadas marimba desde las 9am hasta las 11pm los lunes, miércoles y viernes',
      fechaInicio: moment('2023-03-02', 'YYYY-MM-DD').format('DD/MM/YYYY'),
      fechaFin: moment('2023-03-23', 'YYYY-MM-DD').format('DD/MM/YYYY'),
    }
  ]

  constructor(private dialog:MatDialog) {}

  ngOnInit() {
  }

  registrarParticipacion(evento:any) {
    let dialogRef = this.dialog.open(EventoParticipacionCreateComponent, {
      width: '400px',
      height: 'max-content',
      autoFocus: false,
      data: evento
    });
  }
  
}
