import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Prioridad, TasK } from '../../model/Task.model';
import { PrioridadService } from '../../services/prioridad.service';
import { FormControl, FormGroup ,ReactiveFormsModule ,Validators} from '@angular/forms';
import { FormRequest } from '../../model/FormRequest.model';
import { fromEvent } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';


@Component({
  standalone:true,
  selector: 'app-form-task',
  imports: [ReactiveFormsModule],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.css'
})
export class FormTaskComponent implements OnInit {

  @Input() Task!: TasK | null; // Tarea para edición, null para nueva tarea
  @Output() CloseForm = new EventEmitter<boolean>();
  @Output() SaveForm = new EventEmitter<FormRequest>();

  // Listado de prioridades
  Prioridades: Prioridad[] = [];

  // Título dinámico del formulario
  titleForm: string = '';

  // Formulario reactivo
  TaskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    prioridad: new FormControl('', Validators.required),
  });

  prioridadService = inject(PrioridadService);

  ngOnInit(): void {


    
   
    this.Prioridades = this.prioridadService.GetAllAsync();

   
    this.titleForm = this.Task ? 'Edit Task' : 'New Task';

  
    if (this.Task) {
      this.TaskForm.patchValue({
        title: this.Task.Title,
        prioridad: this.Task.Prioridad,
      });
    }
  }

 
  CloseFormTask() {
  
    this.CloseForm.emit(false);
   
  }

 
  Submit() {

    console.log(this.TaskForm)
    if (this.TaskForm.invalid) {
      this.TaskForm.markAllAsTouched();
      return;
    }

    console.log(this.TaskForm)
    // Crear el request para emitir al componente padre
    const request = new FormRequest();
    request.Id=this.Task?.Id;
    request.Title = this.TaskForm.get('title')?.value ?? '';
    const prioridadValue = this.TaskForm.get('prioridad')?.value ?? 'Baja';
    request.Prioridad = Prioridad[prioridadValue as keyof typeof Prioridad] ?? Prioridad.Baja;

    this.SaveForm.emit(request);

    // Reiniciar el formulario
    this.TaskForm.reset();
  }

  // Verifica si un control tiene errores
  hasError(controlName: string, errorType: string): boolean {
    const control = this.TaskForm.get(controlName);
    return !!(control?.hasError(errorType) && control.touched);
  }
}
