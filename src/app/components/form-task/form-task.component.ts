import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Prioridad, TasK } from '../../model/Task.model';
import { PrioridadService } from '../../services/prioridad.service';
import { FormControl, FormGroup ,ReactiveFormsModule ,Validators} from '@angular/forms';

@Component({
  standalone:true,
  selector: 'app-form-task',
  imports: [ReactiveFormsModule],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.css'
})
export class FormTaskComponent implements OnInit {

  @Input() NewTask!:TasK;
  Prioridades:Prioridad[]=[];
  titleForm:string=this.NewTask==null?'New Task':'Edit Task'


  TaskForm = new FormGroup({
    title : new FormControl('',[Validators.required, Validators.minLength(4)]),
    prioridad : new FormControl('',Validators.required),
  })
 

  @Output() CloseForm = new EventEmitter<boolean>();
  @Output() SaveForm=new EventEmitter<string>();

  prioridadService = inject(PrioridadService);

  ngOnInit(): void {
    this.Prioridades = this.prioridadService.GetAllAsync();
  }

  CloseFormTask(){
    this.CloseForm.emit(false);
  }


  Submit(){
    if (this.TaskForm.invalid) {
      this.TaskForm.markAllAsTouched();
      return;
    }
  
 
    const taskTitle = this.TaskForm.get('title')?.value ?? '';
    
    this.SaveForm.emit(taskTitle);
  
   
    this.TaskForm.reset();
    
  }
  hasError(controlName: string, errorType: string): boolean {
    const control = this.TaskForm.get(controlName);
   
    return !!(control?.hasError(errorType) && control.touched);
  }
}
