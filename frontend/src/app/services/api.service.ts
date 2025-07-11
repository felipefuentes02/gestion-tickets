import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor() {}

  getTickets(): Observable<any[]> {
    return of([]);
  }

  getTicket(id: number): Observable<any> {
    return of(null);
  }
}