import { Prioridad } from "./Task.model"

export class FormRequest{
    Id?:number
    Title:string=''
    Prioridad:Prioridad=Prioridad.Baja
}