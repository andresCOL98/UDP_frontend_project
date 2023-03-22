export class Reporte {
    constructor(
        public id:number,
        public descripcion:string,
        public fecha:Date,
        public nombre:string,
        public periodo_academico_id:number,
        public tipo_reporte:string
    ){}
}
