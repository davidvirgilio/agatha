import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  private refresh = new BehaviorSubject<boolean>(false);

  refreshData$ = this.refresh.asObservable();

  triggerRefreshData(){
    this.refresh.next(true);
  }
}
