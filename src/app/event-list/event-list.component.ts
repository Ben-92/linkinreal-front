import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {


  eventObs;

  constructor(private dataService: DataService) {
  }


  /*get an observable containing the data of an event */
  ngOnInit() {
    this.eventObs = this.dataService.getEventList().pipe(
      map((backEvents: any) => backEvents.content)
    );
  }


}
