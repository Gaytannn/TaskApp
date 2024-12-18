import { computed, Injectable, signal } from '@angular/core';
import { Prioridad, TasK } from '../model/Task.model';
import JSConfetti from 'js-confetti';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  taskNameStorage = 'Tasks'
  tasks = signal<TasK[]>([]);
  TotalTasks = computed(()=>this.tasks().length);
  jsConffeti = new JSConfetti();

  tasksMemory!:TasK[];


  constructor() {

    const taskNameStorage = 'Tasks';
    const storage = localStorage.getItem(taskNameStorage);
    if (storage != null) {
    
      const tasksFromStorage = JSON.parse(storage);
      this.tasksMemory=tasksFromStorage;
      // this.tasks.set(tasksFromStorage);
    } else {
    
      const tasksJson = JSON.stringify(this.tasks());
      localStorage.setItem(taskNameStorage, tasksJson);
    }

   }

  


  GetAllTaskAsync()
  {

    this.tasks.set(this.tasksMemory);
    return this.tasks;
  }

  FilterTasksAsync(filter: { title?: string; prioridad: Prioridad; completed?: boolean }) {
    const tasks = [...this.tasksMemory]
    
    const tasksFilter = tasks.filter(t=>t.Prioridad==filter.prioridad)

    this.tasks.set(tasksFilter);

    return this.tasks;

    
   
  }
  

  AddTaskAsync(title:string,prioridad:Prioridad){
    const newTask = {
      Id:Date.now(),
      Title:title,
      Prioridad:prioridad,
      Completed:false,
    }

    this.tasks.update( tasks => [...tasks,newTask])
    this.updateLocalStorage();

  }


  UpdateTaskAsync(id:number,title:string,prioridad:Prioridad){
    const task = this.tasks().find(task => task.Id==id)
    if(task){
      task.Title=title
      task.Prioridad=prioridad
      this.updateLocalStorage();
    }
  }


  DeleteTaskAsync(id:number){
    const updatedTasks = this.tasks().filter((task) => task.Id !== id);
    this.tasks.set(updatedTasks);
    this.updateLocalStorage();
  }

  CompletedTaskAsync(id:number){
    const task = this.tasks().find(task => task.Id==id)
    if(task){
      const statusTask = task.Completed;
      task.Completed = !statusTask ;
      this.updateLocalStorage();
      !statusTask ? this.jsConffeti.addConfetti() :''
    }
  }

  private updateLocalStorage() {
    const tasksJson = JSON.stringify(this.tasks());
    localStorage.setItem(this.taskNameStorage, tasksJson);
  }
  
}
