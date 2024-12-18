import { Component, inject, OnInit, signal } from '@angular/core';

import { TaskService } from './services/task.service';
import { TasK } from './model/Task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormTaskComponent } from "./components/form-task/form-task.component";


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


  
 

  taskService = inject(TaskService);

  ngOnInit(): void {
    this.tasks=this.taskService.GetAllTaskAsync();
  }

  totalTask = this.taskService.TotalTasks;


  AddTask(title:string){

    if(title.trim()==''){
      this.taskTitleValid=false;
      return
    }
    this.taskService.AddTaskAsync(title);
    this.taskTitleValid=true;
    this.Open=false;
   
  }

  DeleteTask(id:number){
    this.taskService.DeleteTaskAsync(id);
  }

  CompletedTask(id:number){
    this.taskService.CompletedTaskAsync(id);
  

    
  }

  OpenForm(){
    this.Open=true;
  }

  CloseForm(open :boolean){

    console.log(open);
    this.Open=false;
  }
  
}
