export interface Marker{
    id:number,
    pos:{
        lat:number,
        lng:number,
    };
    titulo: string;
    descrip: string;
    tipo: string;
    zona:string;
    fecha:string;
}