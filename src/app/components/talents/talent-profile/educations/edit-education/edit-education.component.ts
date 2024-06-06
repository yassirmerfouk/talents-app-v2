import {Component, inject, Input, OnInit} from '@angular/core';
import {EventService} from "../../../../../services/event.service";
import {EventType} from "../../../../../state/event-type.enum";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Education} from "../../../../../models/education.model";

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrl: './edit-education.component.css'
})
export class EditEducationComponent implements OnInit{

  private eventService : EventService = inject(EventService);
  private formBuilder : FormBuilder = inject(FormBuilder);

  public educationForm !: FormGroup;

  @Input()
  public education !: Education;

  public ngOnInit() : void {
    if(this.education){
      this.educationForm = this.formBuilder.group({
        id : this.formBuilder.control(this.education.id),
        level : this.formBuilder.control(this.education.level),
        domain : this.formBuilder.control(this.education.domain),
        university : this.formBuilder.control(this.education.university),
        country : this.formBuilder.control(this.education.country),
        city : this.formBuilder.control(this.education.city),
        monthOfStart : this.formBuilder.control(this.education.monthOfStart),
        yearOfStart : this.formBuilder.control(this.education.yearOfStart),
        monthOfEnd : this.formBuilder.control(this.education.monthOfEnd),
        yearOfEnd : this.formBuilder.control(this.education.yearOfEnd),
      });
    }
  }

  public handleCloseEditEducation() : void{
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_EDIT_EDUCATION});
  }

  public handleUpdateEducation() : void{
    let education : Education = this.educationForm.value;
   this.eventService.dispatchEvent({eventType : EventType.UPDATE_EDUCATION, payload : education});
  }
}
