import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showFilters: boolean = false;
  
  toggleFilters(){
    this.showFilters = !this.showFilters;
  }

  closeFilters(close: boolean){
    console.log('Filters closed')
    this.showFilters = close;
  }
}
