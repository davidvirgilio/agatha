import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../data.service';
import { RefreshService } from '../../pages/dashboard/refresh.service';
import { error } from 'console';
import { send } from 'process';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

@Input() isEditMode: boolean = false;
@Input() taskData: any;
title : string = "Add a new task";
buttonCopy: string = "Add";

ngOnInit(){
  if(this.isEditMode && this.taskData){
    const dateFromDB = new Date(this.taskData.dueDate);
    
    // Offset of time to match user's one.
    const localDate = new Date(dateFromDB.getTime()+dateFromDB.getTimezoneOffset()*60000);
    const dateToString = new Intl.DateTimeFormat('en-CA').format(localDate);
    console.log(dateToString)
    
    this.taskData.dueDate = dateToString;

    this.taskForm.patchValue(this.taskData);
    this.title = "Modify your task";
    this.buttonCopy = "Update"
  }
}

 // Form management

 constructor(private dataService: DataService, private refreshService: RefreshService ) {}

 date = new Date();
 today = new Intl.DateTimeFormat('en-CA').format(this.date);
 
 taskForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.max(200)),
    dueDate: new FormControl(this.today),
    priority: new FormControl('medium'),
 });

 handleSubmit(){
  if(this.isEditMode && this.taskData){
    const updatedTask = this.taskForm.value;
    const taskId = this.taskData._id;
    this.dataService.updateTask(taskId, updatedTask).subscribe(()=>{
      this.sendClose();
      this.refreshService.triggerRefreshData();
    },(error)=>{
      console.error('Error Updating the task.', error)
    });
  }else{
    const newTask = this.taskForm.value;
    this.dataService.createTask(newTask).subscribe(()=>{
        this.sendClose();
        this.refreshService.triggerRefreshData();
        console.log(newTask.dueDate)
    },(error)=>{
      console.error('Error adding the new task', error);
    });
  }
 }

// Sending close button event to the parent element

  @Output() closeEvent = new EventEmitter<boolean>();

  sendClose(){
    console.log('Close button clicked')
    this.closeEvent.emit(false);
  }
}
