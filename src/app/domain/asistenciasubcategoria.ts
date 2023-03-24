export class Asistenciasubcategoria {
    constructor(
        public id:number,
        public fecha:string,
        public nombre:string,
        public documento:number,
        public periodo_academico_id:number,
        public subcategoria_id:number,
        public usuario_id:number
    ){}
}
