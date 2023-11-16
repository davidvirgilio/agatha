// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://agatha-task.azurewebsites.net/';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks`);
  }

  createTask(newTask: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tasks`, newTask);
  }

  updateTask(taskId: string, updatedTask: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/tasks/${taskId}`, updatedTask);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/tasks/${taskId}`);
  }

  addElement(taskId: string, completed: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/tasks/${taskId}/completed`, {completed});
  }
}
