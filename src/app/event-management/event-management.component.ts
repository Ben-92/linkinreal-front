import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {DataService} from '../data.service';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent implements OnInit {

   /* dateTest = function(){
    const datePrev = new Date();
    console.log (datePrev.getUTCDate);
    return datePrev.getTime;
  } */

  managementForm = this.formBuilder.group({
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



  onAction(eventToAdd) {
    this.dataService.addEvent(eventToAdd).subscribe(savedEvent => console.log(savedEvent));
   }
  



}
