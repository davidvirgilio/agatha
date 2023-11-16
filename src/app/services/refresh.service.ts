import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  private refresh = new BehaviorSubject<string>('');

  refreshData$ = this.refresh.asObservable();

  triggerRefreshData(filter: string){
    this.refresh.next(filter);
  }
}
