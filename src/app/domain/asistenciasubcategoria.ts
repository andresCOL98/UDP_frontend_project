export class Asistenciasubcategoria {
    constructor(
        public id:number,
        public fecha:string,
        public id_pege:number,
        public nombre:string,
        public documento:number,
        public periodoAcademico_id:number,
        public subcategoria_id:number,
        public usuario_id:number
    ){}
}
