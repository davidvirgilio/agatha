import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() closeEvent = new EventEmitter<boolean>();

  sendClose(){
    console.log('Close button clicked')
    this.closeEvent.emit(false);
  }
}
