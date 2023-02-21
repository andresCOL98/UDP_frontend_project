export class Asistenciasubcategoria {
    constructor(
        public id:number,
        public fecha:Date,
        public periodoAcademicoId:number,
        public personaId:number,
        public subcategoriaId:number,
        public usuarioId:number
    ){}
}
