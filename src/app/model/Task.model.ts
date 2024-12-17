import { Timestamp } from "rxjs";

export interface TasK{
    Id:number,
    Title:string,
    Prioridad:Prioridad,
    Completed:boolean,
   
}

export enum Prioridad{
    'Baja',
    'Media',
    'Alta'
}