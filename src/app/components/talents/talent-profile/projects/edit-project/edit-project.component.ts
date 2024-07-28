import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../../../../../services/event.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Project} from "../../../../../models/project.model";
import {EventType} from "../../../../../state/event-type.enum";
import {Helper} from "../../../../../helper/helper";
import {Subscription} from "rxjs";
import {ErrorSuccessState} from "../../../../../state/states.model";

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent implements OnInit, OnDestroy{

  private eventService : EventService = inject(EventService);
  private formBuilder : FormBuilder = inject(FormBuilder);

  public projectForm !: FormGroup;

  @Input()
  public project !: Project;

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState : ErrorSuccessState = {};

  public ngOnInit() : void {
    if(this.project){
      this.projectForm = this.formBuilder.group({
        id : this.formBuilder.control(this.project.id),
        title : this.formBuilder.control(this.project.title),
        shortDescription : this.formBuilder.control(this.project.shortDescription),
        longDescription : this.formBuilder.control(this.project.longDescription),
        resource : this.formBuilder.control(this.project.resource)
      });
    }

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);

  }

  public handleUpdateProject() : void {
    let project : Project = this.projectForm.value;
    this.eventService.dispatchEvent({eventType : EventType.UPDATE_PROJECT, payload : project});
  }

  public handleCloseUpdateProject() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_EDIT_PROJECT});
  }

  public ngOnDestroy(): void {
    if(this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }
}
