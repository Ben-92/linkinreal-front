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

  nb;
  userMessage;
  eventDetailObs;
  currentEventId;
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



  /*Calcul longueur participantByEventIdList*/
  lengthList() {
    this.nb = this.participantByEventIdList.length;
    return this.participantByEventIdList.length;
  }



  nickNameAlreadyParticipant(nickName) {

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

  deleteParticipant(participantId) {
    this.dataService.deleteParticipant(participantId).subscribe(
      (response) => {
        console.log('resp :' + response);
        this.getParticipantByEventId(this.currentEventId);

      }, (err) => {
        console.log('erreur : ' + err);
      },
      () => {
        console.log('participant supprimé');
      }
    );
  }

  /*boolean*/
  allowedToDelete(nickName) {
    return (nickName === this.newParticipant.nickName);
  }

  postParticipant(participantForm) {
    this.userMessage = '';
    this.newParticipant.nickName = participantForm.nickName;
    this.newParticipant.eventId = this.currentEventId;


    if (this.newParticipant.nickName.length < 10 &&
      this.newParticipant.nickName.length > 0 &&
      !this.nickNameAlreadyParticipant(this.newParticipant.nickName)) {
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
    } else {
      this.userMessage = 'Ce nickName n\'est pas autorisé ou vous êtes déja inscrit à l\'évènement';
         }
  }

  onRemoveEvent(eventId) {
    this.dataService.deleteEvent(eventId)
       .subscribe(() => alert("event " + eventId + " supprimé"));
  }



}
