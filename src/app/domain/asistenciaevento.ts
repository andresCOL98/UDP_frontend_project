export class Asistenciaevento {
    constructor(
        public id:number,
        public eventoId:number,
        public fecha:Date,
        public personaId:number,
        public usuarioId:number
    ){}
}
