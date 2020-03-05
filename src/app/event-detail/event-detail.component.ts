import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  eventDetailObs;
  currentEventId;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.currentEventId = params.get('eventId');

      /*get an observable containing the data of an event */
      this.eventDetailObs = this.dataService.getEventDetail(this.currentEventId);
    });
  }


  onRemoveEvent(eventId) {
    this.dataService.deleteEvent(eventId).subscribe();
  }


}
