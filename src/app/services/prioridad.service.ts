import { Injectable } from '@angular/core';
import { Prioridad } from '../model/Task.model';

@Injectable({
  providedIn: 'root'
})
export class PrioridadService {

  constructor() { }

  Prioridades:Prioridad[] = [];

  GetAllAsync(){

    this.Prioridades = [Prioridad.Baja,Prioridad.Media,Prioridad.Alta];
    return this.Prioridades;
  }
}
