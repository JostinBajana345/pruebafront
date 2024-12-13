import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:3000/api/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  saveBet(betDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bet`, betDetails);
  }
  getEvent(params?: any): Observable<any> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<any>(this.apiUrl, { params: httpParams });
  }
}
