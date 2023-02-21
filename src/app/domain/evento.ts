export class Evento {
    constructor(
        public id:number,
        public descripcion:string,
        public fechaFin:Date,
        public fechaInicio:Date,
        public periodoAcademicoId:number,
        public subcategoriaId:number,
        public usuarioId:number
    ){}
}
