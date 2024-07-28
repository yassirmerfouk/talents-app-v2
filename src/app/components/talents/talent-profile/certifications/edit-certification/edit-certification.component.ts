import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../../../../../services/event.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Certification} from "../../../../../models/certification.model";
import {EventType} from "../../../../../state/event-type.enum";
import {Store} from "../../../../../state/store.service";
import {Helper} from "../../../../../helper/helper";
import {Subscription} from "rxjs";
import {ErrorSuccessState} from "../../../../../state/states.model";

@Component({
  selector: 'app-edit-certification',
  templateUrl: './edit-certification.component.html',
  styleUrl: './edit-certification.component.css'
})
export class EditCertificationComponent implements OnInit, OnDestroy{

  private eventService : EventService = inject(EventService);
  private formBuilder : FormBuilder = inject(FormBuilder);

  public certificationForm !: FormGroup;

  @Input()
  public certification !: Certification;

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState : ErrorSuccessState = {};


  public ngOnInit() : void {

    if(this.certification){
      this.certificationForm = this.formBuilder.group({
        id : this.formBuilder.control(this.certification.id),
        title : this.formBuilder.control(this.certification.title),
        issuedAt : this.formBuilder.control(this.certification.issuedAt),
        description : this.formBuilder.control(this.certification.description),
        resource : this.formBuilder.control(this.certification.resource),
      });
    }

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);

  }

  public handleUpdateCertification() : void {
    let certification : Certification = this.certificationForm.value;
    this.eventService.dispatchEvent({eventType : EventType.UPDATE_CERTIFICATION, payload : certification});
  }

  public handleCloseEditCertification() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_EDIT_CERTIFICATION});
  }

  public ngOnDestroy(): void {
    if(this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }

}
