import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DataService} from '../data.service';


@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent implements OnInit {

  managementForm : FormGroup; 

  isSubmitted : boolean;


  message : String;



/*injecting the dataservice and formBuilder */
  constructor(private formBuilder: FormBuilder, 
              private dataService: DataService
              ) { }

  ngOnInit() {

    this.isSubmitted = false;

/*defining the Formcontrol names and associating them with Validators */ 
    this.managementForm = this.formBuilder.group({
      pseudo:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description:'',
      date: ['', Validators.required],
      label: ['', Validators.required],
      streetNumber: ['', Validators.pattern('[0-9]*')],
      street: '',
      postalCode: ['',[Validators.minLength(5), Validators.maxLength(5), Validators.pattern('[0-9]*')]],
      city:['', Validators.required],
      category: ['', Validators.required]
    })
  }

  /**
   * The new Event form is submitted
   * @param eventForm : event Form value
   */
  onAction(eventForm) {

  this.isSubmitted = true;

  /*not going further if not all the input fields have succeeded the Validator controls */
  if (this.managementForm.invalid){
    this.message = "hum...on dirait qu'il manque des informations"
    return;
  }

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
    postalCode : eventForm.postalCode,
    city : eventForm.city
  } 

    /*creating category object */
    let categoryToAddObj = {
      category : eventForm.category
    }  

  /*creating event object */
  let eventToAddObj = {
    date : eventForm.date,
    description : eventForm.description,
    creator : creatorToAddObj,
    place : placeToAddObj,
    eventCategory: categoryToAddObj
  } 

  /**
   * retrieving observable from posting a new Event object
   * displaying message to the user whereas the POST ended ok or ko
   */
  this.dataService.addEvent(eventToAddObj)
      .subscribe(savedEvent => console.log(savedEvent),
                  error => {console.log(error);
                            this.message = "Oups...petit souci";},
                  () => {this.message = 'Nouvel événement enregistré !';
                         })
   }

}

