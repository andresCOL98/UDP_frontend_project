export class Asistenciaevento {
    constructor(
        public id:number,
        public fecha:string,
        public nombre:string,
        public documento:number,
        public usuario_id:number,
        public evento_id:number
    ){}
}
