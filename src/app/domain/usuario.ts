export class Usuario {
    constructor(
        public id:number,
        public id_pege:number,
        public id_usuario:number,
        public usuario:string,
        public nombre:string,
        public documento:number,
        public cargo:string,
        public rol_id:number,
        public categoria_id:number,
        public estado:number
    ){}
}
