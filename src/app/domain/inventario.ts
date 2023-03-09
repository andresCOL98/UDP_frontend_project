export class Inventario {
    constructor(
        public id:number,
        public fecha:string,
        public subcategoria_id:number,
        public item:string,
        public cantidad:number,
        public estado:boolean
    ){}
}


