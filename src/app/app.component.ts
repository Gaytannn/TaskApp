import { Component, inject, OnInit, signal } from '@angular/core';

import { TaskService } from './services/task.service';
import { TasK } from './model/Task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TaskApp';

  tasks = signal<TasK[]>([]);
  taskTitle :string ='';
  taskTitleValid :boolean=true;


  
 

  taskService = inject(TaskService);

  ngOnInit(): void {
    this.tasks=this.taskService.GetAllTaskAsync();
  }

  totalTask = this.taskService.TotalTasks;


  AddTask(){

    if(this.taskTitle.trim()==''){
      this.taskTitleValid=false;
      return
    }
    this.taskService.AddTaskAsync(this.taskTitle);
    this.taskTitleValid=true;
    this.taskTitle='';
  }

  DeleteTask(id:number){
    this.taskService.DeleteTaskAsync(id);
  }

  CompletedTask(id:number){
    this.taskService.CompletedTaskAsync(id);
  

    
  }


  
}
