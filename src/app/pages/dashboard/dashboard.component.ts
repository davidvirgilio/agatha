import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../data.service';
import { RefreshService } from './refresh.service';
import { Subscription } from 'rxjs';
import { FilterService } from '../../services/filters.service';
import { error } from 'node:console';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

showModify = false;
taskData = [];
isEditMode = true;

openModify(data: any){
  this.taskData = data;
  this.showModify = !this.showModify;
}

closeAddTask(close: boolean){
  this.showModify = close;
}


  tasks: any[] = [];

private dataSubscription: Subscription

  constructor(private dataService: DataService, private refreshService: RefreshService) {
    this.dataSubscription = this.refreshService.refreshData$.subscribe(()=>{
      this.callData('initial');
    });
  }
  
  ngOnInit():void {
    this.callData('initial')
  }

ngOnDestroy(): void {
    this.dataSubscription.unsubscribe;
}

callData(type: string){

  this.dataService.getTasks().subscribe((data:any[])=>{
  if(type === 'initial'){
  
      
      
      // Getting today and tomorrow's tasks
      const today = new Date();
      
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      
      const todayData = this.filter(data, today)
      const tomorrowData = this.filter(data, tomorrow)
      const thisWeek = this.sortByDate(this.filterByWeek(data, today));
      const all = this.sortByDate(data)

      const array = [];

      this.insertDataToDashboard('Today',todayData);
      this.insertDataToDashboard('Tomorrow',tomorrowData);
      this.insertDataToDashboard('This Week', thisWeek);
      this.insertDataToDashboard('All', all);

        
      }else{

        
      }
    })
  }
  
  
insertDataToDashboard(title: string, data: any[]){
  if(data.length !== 0){
    const insertTasks = {title: title, array: data};
    const index = this.tasks.findIndex(task => task.title === title);
    console.log(this.tasks)
    console.log(index)
    if(index !== -1){
      this.tasks.splice(index,1,insertTasks);
    }else{
      this.tasks.push(insertTasks);
    }    
  }
}  
  



deleteTask(id: string){
  this.dataService.deleteTask(id).subscribe((res)=>{
    console.log('Task ' + id + 'successfully deleted.' )
    this.callData('initial');

  });
}


toggleDone(task: any){
  task.completed = !task.completed;
  const id = task._id;
  console.log(id);

  this.dataService.addElement(id, task.completed).subscribe((res)=>{
  },(error)=>{
    console.error('Error setting to done', error)
  })


}

sortByDate(dataArray: any[]){

  
  
  const data = dataArray.sort((a,b)=>{
    const A = new Date(a.dueDate);
    const B = new Date(b.dueDate);
    return (A < B)? -1 : ((A > B)? 1 : 0);
  });

  
  return data;
}


// Functions to filter the data by an specific date.

filter(array: any[], date: Date){
  const dateFormat = this.formatDate(date);

  const filteredByDay = array.filter((item)=>{
    const dueDate = this.getLocalTime(item.dueDate); 
    return dueDate == dateFormat;
  })
  return filteredByDay;
}



filterByWeek(array: any[], date: Date){

  const startOfWeek = new Date(date)
  startOfWeek.setDate(date.getDate() - date.getDay());

  const endOfWeek = new Date(date);
  endOfWeek.setDate(date.getDate() - date.getDay() + 6);
  
  const startFormat = this.formatDate(startOfWeek);
  const endFormat = this.formatDate(endOfWeek);
  
  const filter = array.filter((item)=>{
    const dueDate = this.getLocalTime(item.dueDate);
    return dueDate >= startFormat && dueDate <= endFormat;
  })
  return filter;
}


formatDate(date: Date){
  const dateFormat = new Intl.DateTimeFormat('en-CA').format(date);
  return dateFormat;
}

getLocalTime(date: string){
  const day = new Date(date);
  const localDate = new Date(day.getTime() + day.getTimezoneOffset()*60000);
  return this.formatDate(localDate);
}





// Receiving the signal from the filters component



}

