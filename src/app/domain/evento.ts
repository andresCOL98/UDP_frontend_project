export class Evento {
    constructor(
        public id:number,
        public descripcion:string,
        public fecha_fin:string,
        public fecha_inicio:string,
        public periodoacademico_id:number,
        public subcategoria_id:number,
        public usuario_id:number
    ){}
}
