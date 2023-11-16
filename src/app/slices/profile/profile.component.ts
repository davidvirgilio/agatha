import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  username: string = 'Agatha';
  email: string = 'name@agatha.com';

  @Output() closeEvent = new EventEmitter<boolean>();

  sendClose(){
    console.log('Close button clicked')
    this.closeEvent.emit(false);
  }
}
