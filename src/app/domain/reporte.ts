export class Reporte {
    constructor(
        public id:number,
        public descripcion:string,
        public fecha:Date,
        public nombre:string,
        public periodoAcademicoId:number,
        public tipoReporte:string
    ){}
}
