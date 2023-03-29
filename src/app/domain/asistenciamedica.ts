export class Asistenciamedica {
    constructor(
        public id:number,
        public fecha:string,
        public observacion:string,
        public recomendacion:string,
        public otros_datos:string,
        public nombre:string,
        public documento:number,
        public usuario_id:number,
        public tipo_servicio:string,
        public periodo_academico_id:number,
        public programa:string
    ){}
}
