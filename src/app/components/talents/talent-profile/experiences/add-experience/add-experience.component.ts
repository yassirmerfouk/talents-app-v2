import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../../../../../services/event.service";
import {EventType} from "../../../../../state/event-type.enum";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Experience} from "../../../../../models/experience.model";
import {Helper} from "../../../../../helper/helper";
import {Subscription} from "rxjs";
import {ErrorSuccessState} from "../../../../../state/states.model";

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrl: './add-experience.component.css'
})
export class AddExperienceComponent implements OnInit, OnDestroy{

  private eventService : EventService = inject(EventService);

  private formBuilder : FormBuilder = inject(FormBuilder);

  public experienceForm !: FormGroup;

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState : ErrorSuccessState = {};


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

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);
  }

  public handleAddExperience() : void{
    let experience : Experience = this.experienceForm.value;
    this.eventService.dispatchEvent({eventType : EventType.ADD_EXPERIENCE, payload : experience});
  }

  public handleCloseAddExperience() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_ADD_EXPERIENCE});
  }

  public ngOnDestroy(): void {
    if(this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }

}
