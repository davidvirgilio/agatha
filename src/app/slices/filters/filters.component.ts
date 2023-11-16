import { Component, EventEmitter, Output } from '@angular/core';
import { FilterService } from '../../services/filters.service';

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
        { name: 'today' },
        { name: 'tomorrow' },
        { name: 'next week' },
        { name: 'next month' },
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

  constructor(private filterService: FilterService){}

  filter(type: string){
    this.filterService.sendFilter(type)
  }

  @Output() closeEvent = new EventEmitter<boolean>();

  sendClose(){
    console.log('Close button clicked')
    this.closeEvent.emit(false);
  }
}
