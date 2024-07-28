import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Application} from "../../../../models/application.model";
import {EventType} from "../../../../state/event-type.enum";
import {EventService} from "../../../../services/event.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JobInterview} from "../../../../models/job.interview.model";
import {Helper} from "../../../../helper/helper";
import {Subscription} from "rxjs";
import {ErrorSuccessState} from "../../../../state/states.model";

@Component({
  selector: 'app-interview-request',
  templateUrl: './interview-request.component.html',
  styleUrl: './interview-request.component.css'
})
export class InterviewRequestComponent implements OnInit, OnDestroy {

  private eventService: EventService = inject(EventService);

  private formBuilder: FormBuilder = inject(FormBuilder);

  public interviewForm !: FormGroup;

  @Input()
  public application !: Application;

  public totalDates: number = 3;

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState: ErrorSuccessState = {};

  public ngOnInit(): void {
    if (this.application) {
      this.interviewForm = this.formBuilder.group({
        message: this.formBuilder.control(null, [Validators.required]),
        dates: new FormArray([
          this.formBuilder.control(null)
        ])
      });
    }
    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);
  }

  get dates() {
    return this.interviewForm.get('dates') as FormArray;
  }

  public handleAddDateField(): void {
    if (this.dates.length < this.totalDates)
      this.dates.push(this.formBuilder.control(null));
  }

  public handleCloseAskForJobInterview(): void {
    this.eventService.dispatchEvent({eventType: EventType.CLOSE_ASK_FOR_JOB_INTERVIEW});
  }

  public handleAddJobInterview(): void {
    let jobInterview: JobInterview = this.interviewForm.value;
    jobInterview.firstDate = this.interviewForm.get('dates')?.value[0];
    jobInterview.secondDate = this.interviewForm.get('dates')?.value[1];
    jobInterview.thirdDate = this.interviewForm.get('dates')?.value[2];
    this.eventService.dispatchEvent({
      eventType: EventType.ADD_JOB_INTERVIEW,
      payload: {application: this.application, jobInterview: jobInterview}
    });
  }

  public ngOnDestroy(): void {
    if (this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }
}
