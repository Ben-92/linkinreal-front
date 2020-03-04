import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getEventDetail(eventId) {
    return this.httpClient.get('http://localhost:8080/api/linkinreal/events/' + eventId );
  }

  deleteEvent(eventId) {
    return this.httpClient.delete('http://localhost:8080/api/linkinreal/events/' + eventId );
  }

}
