import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../data.service';
import { RefreshService } from '../../services/refresh.service';
import { Subscription } from 'rxjs';
import { FilterService } from '../../services/filters.service';
import { error } from 'node:console';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

isEmpty: boolean = false;

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

  filter: string = 'today';
  tasks: any[] = [];

private dataSubscription: Subscription

ngOnInit():void {
  this.callData(this.filter)
}

  constructor(private dataService: DataService, private refreshService: RefreshService) {
    this.dataSubscription = this.refreshService.refreshData$.subscribe((filter:string)=>{
      this.callData(filter);
    });
  }
  
  
ngOnDestroy(): void {
    this.dataSubscription.unsubscribe;
}

callData(type: string){

  this.dataService.getTasks().subscribe((data:any[])=>{
  switch(type){

    case "all":
    this.showAll(data);
    this.isEmpty = false;
    break

    case "today":
    this.showToday(data)
    this.isEmpty = false;

    break
    case "tomorrow":
    this.showTomorrow(data)
    this.isEmpty = false;

    break
    case "this week":
    this.showThisWeek(data)
    this.isEmpty = false;
    break

    default:
      this.isEmpty = true;
    }
})
}




showAll(data: any){
  const all = this.sortByDate(data)
  this.insertDataToDashboard('All Tasks', all);
}


showToday(data: any){
  const today = new Date();
  const todayData = this.filterBy(data, today)
  this.insertDataToDashboard('Today',todayData);
}

showTomorrow(data: any){
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowData = this.filterBy(data, tomorrow)
  this.insertDataToDashboard('Tomorrow',tomorrowData);
}

showThisWeek(data: any){
  const today = new Date();
  const thisWeek = this.sortByDate(this.filterByWeek(data, today));
  this.insertDataToDashboard('This Week', thisWeek);
}

insertDataToDashboard(title: string, data: any){
  if(data.length !== 0){
    this.tasks = [{title: title, array: data}];
  }
}  


deleteTask(id: string){
  this.dataService.deleteTask(id).subscribe((res)=>{
    console.log('Task ' + id + 'successfully deleted.' )
    this.callData('all');

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

filterBy(array: any[], date: Date){
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

