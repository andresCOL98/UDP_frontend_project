import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-asistenciamedica-list',
  templateUrl: './asistenciamedica-list.component.html',
  styleUrls: ['./asistenciamedica-list.component.scss']
})
export class AsistenciamedicaListComponent {
  form = {
    cedula: '',
    fecha: '',
  }

  historias = [
    {
      id: 1,
      nombrePaciente: 'Oswaldo Ordoñez',
      fechaConsulta: moment('2023-03-02').format('DD/MM/YYYY'),
      diagnostico: 'Oídos obstruídos por goma de audífonos',
      descripcion: 'Paciente ingresa con severa obstrucción auditiva y habla muy fuerte porque no es capaz de escucharse a sí mismo. Se realiza revisión con fonoscopio y se detecta goma de auriculares obstruyendo el canal auditivo.',
      tratamiento: 'Se retira con pinzas y se revisa que no quede ningún tipo de residuo. También se dan charlas de conscientización.',
    },
    {
      id: 2,
      nombrePaciente: 'Andrés Silva',
      fechaConsulta: moment('2023-03-02').format('DD/MM/YYYY'),
      diagnostico: 'Deshidratación y golpe de calor',
      descripcion: 'Paciente ingresa casi al borde del desmayo tras correr bajo el sol durante 5 horas. Se aprecian ojos blancos, palidez y extrema sudoración.',
      tratamiento: 'Se le da agua y mejora.',
    },
    {
      id: 3,
      nombrePaciente: 'Oswaldo Ordoñez',
      fechaConsulta: moment('2023-03-02').format('DD/MM/YYYY'),
      diagnostico: 'Disfunción eréctil',
      descripcion: 'Paciente entra con su pene en la mano porque dice que "Se le murió".',
      tratamiento: 'Se envía al sexólogo por posibles problemas de disfunción eréctil.',
    },
    {
      id: 4,
      nombrePaciente: 'Andrés Silva',
      fechaConsulta: moment('2023-03-02').format('DD/MM/YYYY'),
      diagnostico: 'Aparente trastorno mental',
      descripcion: 'El compa está raro.',
      tratamiento: 'Se envía a psiquiatría para dar mejor atención.',
    }
  ]

  constructor() {}

  ngOnInit() {
  }
}
