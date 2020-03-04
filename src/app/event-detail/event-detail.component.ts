import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

eventDetailObs;

  constructor(private dataService: DataService) { }

  ngOnInit() {

          /*get an observable containing the data of an event */
          this.eventDetailObs = this.dataService.getEventDetail(1);
  }

}
