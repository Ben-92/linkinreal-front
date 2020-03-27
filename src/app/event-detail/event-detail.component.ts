import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

import {map, tap} from 'rxjs/operators';
import {Participant} from '../participant';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  eventDetailObs;
  currentEventId;
  participantNb;
  participantByEventIdList;
  newParticipant = new Participant();
  participant;
  participantForm = this.formBuilder.group({
    nickName: ''

  });
  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.currentEventId = params.get('eventId');

      /*get an observable containing the data of an event */
      this.eventDetailObs = this.dataService.getEventDetail(this.currentEventId);
    });
    this.getParticipantByEventId(this.currentEventId);
  }

  nickNameIsParticipant(nickName) {
    for (this.participant of this.participantByEventIdList) {
      if (this.participant.nickName === nickName) {
        return true;
      }
    }
  }

  getParticipantByEventId(eventId) {
    this.dataService.getParticipantsByEventId(eventId).subscribe(
      (response) => {
        console.log('resp :' + response);
        this.participantByEventIdList = response;
      }, (err) => {
        console.log('erreur : ' + err);
      },
      () => {
        console.log('end');
      }
    );
  }


  postParticipant(participantForm) {

    this.newParticipant.nickName = participantForm.nickName;
    this.newParticipant.eventId = this.currentEventId;


    if (!this.nickNameIsParticipant(this.newParticipant.nickName)) {
      this.dataService.addParticipant(this.newParticipant).subscribe(
        (response) => {
          this.getParticipantByEventId(this.currentEventId);
          console.log('resp :' + response);

        }, (err) => {
          console.log('erreur : ' + err);
        },
        () => {
          console.log('finishing posting participant');

        }
      );
    }
  }

  onRemoveEvent(eventId) {
    this.dataService.deleteEvent(eventId)
       .subscribe(() => alert("event " + eventId + " supprimé"));
  }

  /*
  onRemoveEvent(eventId) {
    this.dataService.deleteEvent(eventId)
       .subscribe(
         () => alert("event " + eventId + " supprimé"));
         this.router.navigate(['']);
       );
  }
  */
 /*
     this.router.navigate(['../list'], { relativeTo: this.route });
  }
  */




}
