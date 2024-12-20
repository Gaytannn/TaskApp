import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TasK } from '../../model/Task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  imports: [FormsModule,CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {

  @Input() task!:TasK;


  @Output() changeCheckBox = new EventEmitter<TasK>();
  @Output() delete = new EventEmitter<TasK>();
  @Output() edit = new EventEmitter<TasK>();


  CompletedTask(task:TasK){
    this.changeCheckBox.emit(this.task);
  }

  DeleteTask(task:TasK){
    this.delete.emit(this.task);
  }

  EditTask(task:TasK){
    this.edit.emit(this.task);
  }
}
