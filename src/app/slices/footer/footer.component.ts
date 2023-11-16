import { Component} from '@angular/core';
import { AddTaskComponent } from '../add-task/add-task.component';
import { SearchComponent } from '../search/search.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  showAddTask: boolean = false;
  showSearch: boolean = false;
  showProfile: boolean = false;
  
  toggleAddTask(){
    if(this.showSearch){ this.showSearch = false};
    this.showAddTask = !this.showAddTask;
  }
  toggleSearch(){
    this.showSearch = !this.showSearch;
  }
  toggleProfile(){
    if(this.showSearch){ this.showSearch = false};
    this.showProfile = !this.showProfile;
  }

  closeAddTask(close: boolean){
    console.log('Add new task closed')
    this.showAddTask = close;
  }
  closeSearch(close: boolean){
    console.log('Search closed!')
    this.showSearch = close;
  }
  closeProfile(close: boolean){
    console.log('Profile closed!')
    this.showProfile = close;
  }




}
