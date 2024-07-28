import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../../../../../services/event.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Experience} from "../../../../../models/experience.model";
import {EventType} from "../../../../../state/event-type.enum";
import {Helper} from "../../../../../helper/helper";
import {Subscription} from "rxjs";
import {ErrorSuccessState} from "../../../../../state/states.model";

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrl: './edit-experience.component.css'
})
export class EditExperienceComponent implements OnInit, OnDestroy{

  private eventService : EventService = inject(EventService);
  private formBuilder : FormBuilder = inject(FormBuilder);

  public experienceForm !: FormGroup;

  @Input()
  public experience !: Experience;

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState : ErrorSuccessState = {};

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

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);
  }

  public handleCloseEditExperience() : void{
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_EDIT_EXPERIENCE});
  }

  public handleUpdateExperience() : void{
    let experience : Experience = this.experienceForm.value;
    this.eventService.dispatchEvent({eventType : EventType.UPDATE_EXPERIENCE, payload : experience});
  }

  public ngOnDestroy(): void {
    if(this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }

}
