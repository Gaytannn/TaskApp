import { computed, Injectable, signal } from '@angular/core';
import { Prioridad, TasK } from '../model/Task.model';
import JSConfetti from 'js-confetti';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  taskNameStorage = 'Tasks'
  tasks = signal<TasK[]>([]);
  tasksMemory!:TasK[];
  jsConffeti = new JSConfetti();

  


  constructor() {

    const taskNameStorage = 'Tasks';
    const storage = localStorage.getItem(taskNameStorage);
    if (storage != null) {
    
      const tasksFromStorage = JSON.parse(storage);
      this.tasksMemory=tasksFromStorage;
      this.tasks.set(this.tasksMemory);
      
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
      Id: Date.now(),
      Title: title,
      Prioridad: prioridad,
      Completed: false,
    };
    this.tasksMemory = [...this.tasksMemory, newTask]; // Crear un nuevo array
    this.updateLocalStorage();

  }


  UpdateTaskAsync(id:number,title:string,prioridad:Prioridad){
    const task = this.tasksMemory.find(task => task.Id==id)
    if(task){
      task.Title=title
      task.Prioridad=prioridad
      this.updateLocalStorage();
    }
  }


  DeleteTaskAsync(id:number){

    this.tasksMemory = this.tasksMemory.filter((task) => task.Id !== id);
    // const updatedTasks = this.tasks().filter((task) => task.Id !== id);
  
    this.updateLocalStorage();
  }

  CompletedTaskAsync(id:number){
    const task = this.tasksMemory.find(task => task.Id==id)
    if(task){
      const statusTask = task.Completed;
      task.Completed = !statusTask ;
      this.updateLocalStorage();
      !statusTask ? this.jsConffeti.addConfetti() :''
    }
  }

  private updateLocalStorage() {
    const tasksJson = JSON.stringify(this.tasksMemory);
    localStorage.setItem(this.taskNameStorage, tasksJson);

    this.tasks.set(this.tasksMemory);

    
    
    
  
  }
  
}
