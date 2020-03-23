import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {DataService} from '../data.service';
import { Event } from '../event';
import { Creator } from '../creator';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent implements OnInit {

  eventToAdd : Event;
  creatorToAdd : Creator;

  managementForm = this.formBuilder.group({
    pseudo: ' ',
    email: ' ',
    description:' ',
    date: ' ',
    participantNb:0,
    label: ' ',
    streetNumber: 0,
    street: ' ',
    postalCode: 0,
    category: ' '
  })

  constructor(private formBuilder: FormBuilder, 
              private dataService: DataService) { }

  ngOnInit() {
  }


  onAction(eventForm) {

  /*creating creator object */
  let creatorToAddObj = {
      nickName : eventForm.pseudo,
      email : eventForm.email
    } 

  /*creating place object */
  let placeToAddObj = {
    label : eventForm.label,
    streetNumber : eventForm.streetNumber,
    street : eventForm.street,
    postalCode : eventForm.postalCode
  } 

    /*creating category object */
    let categoryToAddObj = {
      category : eventForm.category
    } 

  /*creating event object */
  let eventToAddObj = {
    date : eventForm.date,
    description : eventForm.description,
    participantNb : eventForm.participantNb,
    creator : creatorToAddObj,
    place : placeToAddObj,
    eventCategory: categoryToAddObj
  } 


    this.dataService.addEvent(eventToAddObj)
      .subscribe(savedEvent => console.log(savedEvent));
   }
   

}

  /*
  this.creatorToAdd.nickName = eventForm.pseudo;
  this.creatorToAdd.email = eventForm.email;
  */

    /*
    this.eventToAdd.date = eventForm.date;
    this.eventToAdd.description = eventForm.description;
    this.eventToAdd.participantNb = eventForm.participantNb;
    this.eventToAdd.creator = this.creatorToAdd;
    */