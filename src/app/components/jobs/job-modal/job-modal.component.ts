import {Component, inject, Input} from '@angular/core';
import {Job} from "../../../models/job.model";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {AuthStateService} from "../../../services/auth.state.service";

@Component({
  selector: 'app-job-modal',
  templateUrl: './job-modal.component.html',
  styleUrl: './job-modal.component.css'
})
export class JobModalComponent {

  private eventService: EventService = inject(EventService);
  public authStateService: AuthStateService = inject(AuthStateService);

  @Input()
  public job !: Job;

  public handleCloseJob(): void {
    this.eventService.dispatchEvent({eventType: EventType.CLOSE_JOB});
  }

  public handleApplyToJob(id: number): void {
    this.eventService.dispatchEvent({eventType : EventType.APPLY_TO_JOB, payload : id});
  }
}
