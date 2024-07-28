import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Project} from "../../../../../models/project.model";
import {EventService} from "../../../../../services/event.service";
import {EventType} from "../../../../../state/event-type.enum";
import {Helper} from "../../../../../helper/helper";
import {Subscription} from "rxjs";
import {ErrorSuccessState} from "../../../../../state/states.model";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent implements OnInit, OnDestroy{

  private eventService : EventService = inject(EventService);
  private formBuilder : FormBuilder = inject(FormBuilder);

  public projectForm !: FormGroup;

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState : ErrorSuccessState = {};

  public ngOnInit() : void {
    this.projectForm = this.formBuilder.group({
      title : this.formBuilder.control(null),
      shortDescription : this.formBuilder.control(null),
      longDescription : this.formBuilder.control(null),
      resource : this.formBuilder.control(null)
    });

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);
  }

  public handleAddProject() : void {
    let project : Project = this.projectForm.value;
    this.eventService.dispatchEvent({eventType : EventType.ADD_PROJECT, payload : project});
  }

  public handleCloseAddProject() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_ADD_PROJECT});
  }

  public ngOnDestroy(): void {
    if(this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }

}
