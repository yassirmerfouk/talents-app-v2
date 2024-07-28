import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../../../../../services/event.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Education} from "../../../../../models/education.model";
import {EventType} from "../../../../../state/event-type.enum";
import {Helper} from "../../../../../helper/helper";
import {Subscription} from "rxjs";
import {ErrorSuccessState} from "../../../../../state/states.model";

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrl: './add-education.component.css'
})
export class AddEducationComponent implements OnInit, OnDestroy{

  private eventService : EventService = inject(EventService);

  private formBuilder : FormBuilder = inject(FormBuilder);

  public educationForm !: FormGroup;

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState : ErrorSuccessState = {};

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

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);
  }

  public handleAddEducation() : void{
    let education : Education = this.educationForm.value;
    this.eventService.dispatchEvent({eventType : EventType.ADD_EDUCATION, payload : education});
  }

  public handleCloseAddEducation() : void{
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_ADD_EDUCATION});
  }

  public ngOnDestroy(): void {
    if(this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }
}
