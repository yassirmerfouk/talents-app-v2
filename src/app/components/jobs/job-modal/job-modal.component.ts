import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Job} from "../../../models/job.model";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {AuthStateService} from "../../../services/auth.state.service";
import {Helper} from "../../../helper/helper";
import {ErrorSuccessState} from "../../../state/states.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-job-modal',
  templateUrl: './job-modal.component.html',
  styleUrl: './job-modal.component.css'
})
export class JobModalComponent implements OnInit, OnDestroy {

  private eventService: EventService = inject(EventService);
  public authStateService: AuthStateService = inject(AuthStateService);

  @Input()
  public job !: Job;

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState: ErrorSuccessState = {};

  public ngOnInit(): void {
    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);
  }

  public handleCloseJob(): void {
    this.eventService.dispatchEvent({eventType: EventType.CLOSE_JOB});
  }

  public handleApplyToJob(id: number): void {
    if(confirm("Are you sure for to apply to the job?"))
    this.eventService.dispatchEvent({eventType: EventType.APPLY_TO_JOB, payload: id});
  }

  public ngOnDestroy(): void {
    if (this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }
}
