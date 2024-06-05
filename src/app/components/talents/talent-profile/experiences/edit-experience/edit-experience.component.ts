import {Component, inject, Input, OnInit} from '@angular/core';
import {EventService} from "../../../../../services/event.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Experience} from "../../../../../models/experience.model";
import {EventType} from "../../../../../state/event-type.enum";

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrl: './edit-experience.component.css'
})
export class EditExperienceComponent implements OnInit{

  private eventService : EventService = inject(EventService);
  private formBuilder : FormBuilder = inject(FormBuilder);

  public experienceForm !: FormGroup;

  @Input()
  public experience !: Experience;

  public handleCloseEditExperience() : void{
    this.eventService.publishEvent({eventType : EventType.CLOSE_EDIT_EXPERIENCE});
  }

  public ngOnInit() : void {
    if(this.experience){
      this.experienceForm = this.formBuilder.group({
        id : this.formBuilder.control(this.experience.id),
        title : this.formBuilder.control(this.experience.title),
        company : this.formBuilder.control(this.experience.company),
        country : this.formBuilder.control(this.experience.country),
        city : this.formBuilder.control(this.experience.city),
        monthOfStart : this.formBuilder.control(this.experience.monthOfStart),
        yearOfStart : this.formBuilder.control(this.experience.yearOfStart),
        monthOfEnd : this.formBuilder.control(this.experience.monthOfEnd),
        yearOfEnd : this.formBuilder.control(this.experience.yearOfEnd),
        description : this.formBuilder.control(this.experience.description),
      });
    }
  }

  public handleUpdateExperience() : void{
    let experience : Experience = this.experienceForm.value;
    this.eventService.publishEvent({eventType : EventType.UPDATE_EXPERIENCE, payload : experience});
  }
}
