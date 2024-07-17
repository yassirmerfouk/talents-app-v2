import {Component, inject, Input, OnInit} from '@angular/core';
import {JobInterview} from "../../../../models/job.interview.model";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {Job} from "../../../../models/job.model";
import {Application} from "../../../../models/application.model";

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrl: './interview.component.css'
})
export class InterviewComponent implements OnInit{

  private eventService : EventService = inject(EventService);


  @Input()
  public application !: Application;


  public jobInterview !: JobInterview;

  @Input()
  public job !: Job;

  public handleCloseJobInterview() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_JOB_INTERVIEW});
  }

  public ngOnInit() : void {
    this.jobInterview = this.application.jobInterviews[0];
  }

  public handleOnCreateMeet(date : string) : void {
    this.eventService.dispatchEvent({
      eventType : EventType.OPEN_ADD_CLIENT_MEET,
      payload : {
        job : this.job,
        application : this.application,
        date : date
      }
    })
  }
}
