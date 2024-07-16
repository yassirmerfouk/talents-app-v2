import {Component, inject, Input} from '@angular/core';
import {JobInterview} from "../../../../models/job.interview.model";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrl: './interview.component.css'
})
export class InterviewComponent {

  private eventService : EventService = inject(EventService);

  @Input()
  public jobInterview !: JobInterview;

  public handleCloseJobInterview() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_JOB_INTERVIEW});
  }
}
