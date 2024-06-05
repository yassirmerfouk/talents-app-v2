import {Component, inject, OnInit} from '@angular/core';
import {EventService} from "../../../../../services/event.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Education} from "../../../../../models/education.model";
import {EventType} from "../../../../../state/event-type.enum";

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrl: './add-education.component.css'
})
export class AddEducationComponent implements OnInit{

  private eventService : EventService = inject(EventService);
  private formBuilder : FormBuilder = inject(FormBuilder);

  public educationForm !: FormGroup;

  public ngOnInit() : void {
    this.educationForm = this.formBuilder.group({
      level : this.formBuilder.control(null),
      domain : this.formBuilder.control(null),
      university : this.formBuilder.control(null),
      country : this.formBuilder.control(null),
      city : this.formBuilder.control(null),
      monthOfStart : this.formBuilder.control(1),
      yearOfStart : this.formBuilder.control(2024),
      monthOfEnd : this.formBuilder.control(1),
      yearOfEnd : this.formBuilder.control(2024),
    });
  }

  public handleAddEducation() : void{
    let education : Education = this.educationForm.value;
    this.eventService.publishEvent({eventType : EventType.ADD_EDUCATION, payload : education});
  }

  public handleCloseAddEducation() : void{
    this.eventService.publishEvent({eventType : EventType.CLOSE_ADD_EDUCATION});
  }
}
