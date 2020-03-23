import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) {
  }
/**
 * get an event with its Id
 * @param eventId Id of the event to show
 */
  getEventDetail(eventId) {
    return this.httpClient.get('http://localhost:8080/api/linkinreal/events/' + eventId);
  }

  getEventList() {
    return this.httpClient.get('http://localhost:8080/api/linkinreal/events');
  }

/**
 * delete an event giving its Id
 * @param eventId Od of the event to delete
 */
  deleteEvent(eventId) {
    return this.httpClient.delete('http://localhost:8080/api/linkinreal/events/' + eventId );
  }

  /**
   * @param eventToAdd event to Add
   */
  addEvent(eventToAdd) {
    return this.httpClient.post('http://localhost:8080/api/linkinreal/events/', eventToAdd);
  }

  /**
   * faut il passer par cette méthode pour les ajouts d'event, ie faut il d'abord ajouter la place ?
   * @param placeToAdd 
   */
  addplace(placeToAdd) {
    return this.httpClient.post('http://localhost:8080/api/places/', placeToAdd);
  }

}
