import { Component } from '@angular/core';

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
      fechaInicio: '2023-03-02',
      fechaFin: '2023-03-02',
    },
    {
      id: 2,
      titulo: 'CLASE DE TROMPETA',
      descripcion: 'Clases personalizadas trompeta desde las 9am hasta las 11pm los lunes, miércoles y viernes',
      fechaInicio: '2023-03-02',
      fechaFin: '2023-03-02',
    },
    {
      id: 3,
      titulo: 'CLASE DE CLARINETE',
      descripcion: 'Clases personalizadas clarinete desde las 9am hasta las 11pm los lunes, miércoles y viernes',
      fechaInicio: '2023-03-02',
      fechaFin: '2023-03-02',
    },
    {
      id: 4,
      titulo: 'CLASE DE BOMBO',
      descripcion: 'Clases personalizadas bombo desde las 9am hasta las 11pm los lunes, miércoles y viernes',
      fechaInicio: '2023-03-02',
      fechaFin: '2023-03-02',
    },
    {
      id: 5,
      titulo: 'CLASE DE MARIMBA',
      descripcion: 'Clases personalizadas marimba desde las 9am hasta las 11pm los lunes, miércoles y viernes',
      fechaInicio: '2023-03-02',
      fechaFin: '2023-03-02',
    }
  ]

  constructor() {}

  ngOnInit() {
  }
  
}
