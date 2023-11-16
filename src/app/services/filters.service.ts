import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterSubject = new Subject<string>();

  filter$ = this.filterSubject.asObservable();

  sendFilter(type: string) {
    this.filterSubject.next(type);
  }
}
