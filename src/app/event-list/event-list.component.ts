import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {


  eventObs;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    /*get an observable containing the data of an event */
    this.eventObs = this.dataService.getEventList().pipe(
      map(backEvents => backEvents.content)
    );
  }

}
