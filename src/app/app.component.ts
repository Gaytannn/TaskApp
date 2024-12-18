import { Component, inject, OnInit, signal } from '@angular/core';

import { TaskService } from './services/task.service';
import { Prioridad, TasK } from './model/Task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormTaskComponent } from "./components/form-task/form-task.component";
import { FormRequest } from './model/FormRequest.model';


@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, FormTaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TaskApp';

  tasks = signal<TasK[]>([]);
  taskTitle :string ='';
  taskTitleValid :boolean=true;
  Open : boolean=false;


  taskEdit!:TasK|null;


  
 

  taskService = inject(TaskService);

  ngOnInit(): void {
   
    this.tasks =this.taskService.GetAllTaskAsync();
  }

  totalTask = this.taskService.TotalTasks;


  AddTask(request:FormRequest){


   


    if(request.Title.trim()==''){
      this.taskTitleValid=false;
      return
    }

    if(request?.Id)
    {
      this.taskService.UpdateTaskAsync(request.Id, request.Title,request.Prioridad);
      
    }else{
      this.taskService.AddTaskAsync(request.Title,request.Prioridad);
    }

   
    this.taskTitleValid=true;
    this.Open=false;
   
  }

  DeleteTask(id:number){
    this.taskService.DeleteTaskAsync(id);
  }


  EditTask(task:TasK){
    this.taskEdit = { ...task }; // Hacemos una copia para evitar modificar directamente la tarea
    this.Open = true;
  }

  CompletedTask(id:number){
    this.taskService.CompletedTaskAsync(id);
  

    
  }

  filter(priority: string | '') {
  
    if (priority === '') {
      this.tasks = this.taskService.GetAllTaskAsync();
    } else {
      // Convertir la cadena a enum y filtrar
      const prioridadEnum = priority as Prioridad; // Convertir a tipo `Prioridad`
      this.tasks = this.taskService.FilterTasksAsync({ prioridad: prioridadEnum });
      
    }

  }
  

  OpenForm(){
    this.Open=true;
  }

  CloseForm(open :boolean){

  
    this.Open=false;
    this.taskEdit = null;
  }
  
}
