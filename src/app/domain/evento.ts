export class Evento {
    constructor(
        public id:number,
        public nombre:string,
        public descripcion:string,
        public fecha_fin:string,
        public fecha_inicio:string,
        public periodo_academico_id:number,
        public subcategoria_id:number,
        public usuario_id:number
    ){}
}
