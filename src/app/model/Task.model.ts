

export interface TasK{
    Id:number,
    Title:string,
    Prioridad:Prioridad,
    Completed:boolean,
   
}

export enum Prioridad{
    Baja='Baja',
    Media='Media',
    Alta='Alta'
}