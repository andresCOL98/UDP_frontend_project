export class Asistenciamedica {
    constructor(
        public id:number,
        public fecha:Date,
        public observacion:string,
        public otrosDatos:string,
        public personaId:number,
        public usuarioId:number
    ){}
}
