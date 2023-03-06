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
      tratamiento: 'Se retira con pinzas y se revisa que no quede ningún tipo de residuo. También se dan charlas de conscientización para evitar que vuelva a suceder.',
    },
    {
      id: 2,
      nombrePaciente: 'Andrés Silva',
      fechaConsulta: moment('2023-03-02').format('DD/MM/YYYY'),
      diagnostico: 'Deshidratación y golpe de calor',
      descripcion: 'Paciente ingresa casi al borde del desmayo tras correr bajo el sol durante 5 horas. Se aprecian ojos blancos, palidez y extrema sudoración.',
      tratamiento: 'Se suministran sales de rehidratación oral y mejora tras 20 minutos de descanso.',
    },
    {
      id: 3,
      nombrePaciente: 'Felipe Sánchez',
      fechaConsulta: moment('2023-03-02').format('DD/MM/YYYY'),
      diagnostico: 'Hematoma por golpe con una puerta',
      descripcion: 'El paciente ingresa con un hematoma en el ojo derecho cerca del nervio ocular. Comenta que previo al evento tuvo un momento donde vio todo negro y cuando reaccionó, ya estaba frente al marco de la puerta con la que se golpeó',
      tratamiento: 'Se autorizan exámenes de sangre para descartar problemas de azucar y colesterol, además de le suministra frío en la zona afectada para facilitar la recuperación.',
    },
    {
      id: 4,
      nombrePaciente: 'María Quevedo',
      fechaConsulta: moment('2023-03-02').format('DD/MM/YYYY'),
      diagnostico: 'VPH',
      descripcion: 'La paciente ingresa informando incomodidad y picazón en su zona íntima, además de aparición de verrugas con forma de flor. Se raliza revisión preliminar y todos los síntomas concuerdan con el virus del papiloma humano.',
      tratamiento: 'Se autorizan las 3 dosis de la vacuna contra el VPH y se dan indicaciones de volver para revisar cómo continúa',
    }
  ]

  constructor() {}

  ngOnInit() {
  }
}
