import { Component, EventEmitter, Output } from '@angular/core';
import { RefreshService } from '../../services/refresh.service';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  data: any[] = [
    {
      title: 'Due Date',
      filters: [
        { name: 'all' },
        { name: 'today' },
        { name: 'tomorrow' },
        { name: 'next week' },
      ]
    },
    {
      title: 'Priority',
      filters: [
        { name: 'low' },
        { name: 'medium' },
        { name: 'high' },
        { name: 'urgent' },
      ]
    },
  ]

  constructor(private refreshService: RefreshService){}

  triggerFilter(type: string){
    this.refreshService.triggerRefreshData(type);
    this.sendClose();
  }

  @Output() closeEvent = new EventEmitter<boolean>();

  sendClose(){
    console.log('Close button clicked')
    this.closeEvent.emit(false);
  }
}
