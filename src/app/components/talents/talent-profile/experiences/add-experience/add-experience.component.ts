import {Component, inject, OnInit} from '@angular/core';
import {EventService} from "../../../../../services/event.service";
import {EventType} from "../../../../../state/event-type.enum";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Experience} from "../../../../../models/experience.model";

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrl: './add-experience.component.css'
})
export class AddExperienceComponent implements OnInit{

  private eventService : EventService = inject(EventService);
  private formBuilder : FormBuilder = inject(FormBuilder);

  public experienceForm !: FormGroup;

  public ngOnInit() : void {
    this.experienceForm = this.formBuilder.group({
      title : this.formBuilder.control(null),
      company : this.formBuilder.control(null),
      country : this.formBuilder.control(null),
      city : this.formBuilder.control(null),
      monthOfStart : this.formBuilder.control(1),
      yearOfStart : this.formBuilder.control(2024),
      monthOfEnd : this.formBuilder.control(1),
      yearOfEnd : this.formBuilder.control(2024),
      description : this.formBuilder.control(null),
    });
  }

  public handleAddExperience() : void{
    let experience : Experience = this.experienceForm.value;
    this.eventService.publishEvent({eventType : EventType.ADD_EXPERIENCE, payload : experience});
  }

  public handleCloseAddExperience() : void {
    this.eventService.publishEvent({eventType : EventType.CLOSE_ADD_EXPERIENCE});
  }
}
