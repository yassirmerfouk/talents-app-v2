import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user.model";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {Meet} from "../../../models/meet.model";
import {Helper} from "../../../helper/helper";
import {Subscription} from "rxjs";
import {ErrorSuccessState} from "../../../state/states.model";

@Component({
  selector: 'app-add-selection-meet',
  templateUrl: './add-selection-meet.component.html',
  styleUrl: './add-selection-meet.component.css'
})
export class AddSelectionMeetComponent implements OnInit, OnDestroy {

  private eventService: EventService = inject(EventService);

  private formBuilder: FormBuilder = inject(FormBuilder);

  public meetForm !: FormGroup;

  public type: string = 'ADMIN_INTERVIEW';

  @Input()
  public user !: User;

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState : ErrorSuccessState = {};

  public ngOnInit(): void {

    this.meetForm = this.formBuilder.group({
      title: this.formBuilder.control(null, [Validators.required]),
      date: this.formBuilder.control(null, [Validators.required]),
      meetType: this.formBuilder.control('ADMIN_INTERVIEW', [Validators.required]),
      contactType: this.formBuilder.control('VIDEO_CALL', [Validators.required]),
      firstBody: this.formBuilder.control(null),
      resource: this.formBuilder.control(null),
    });

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);

  }

  public handleCloseAddSelectionMeet(): void {
    this.eventService.dispatchEvent({eventType: EventType.CLOSE_ADD_SELECTION_MEET});
  }

  public handleAddSelectionMeet() : void {
    let meetRequest : Meet = this.meetForm.value;
    meetRequest.receivers = [this.user.id];
    this.eventService.dispatchEvent({eventType: EventType.ADD_SELECTION_MEET, payload : meetRequest});
  }

  public ngOnDestroy(): void {
    if(this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }

}
