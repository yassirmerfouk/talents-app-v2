import {Component, inject, Input, OnInit} from '@angular/core';
import {Meet} from "../../../../models/meet.model";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {AuthStateService} from "../../../../services/auth.state.service";

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrl: './meet.component.css'
})
export class MeetComponent implements OnInit {

  private eventService: EventService = inject(EventService);

  private authStateService: AuthStateService = inject(AuthStateService);

  @Input()
  public meet !: Meet;
  public body !: string;

  public ngOnInit(): void {
    if (this.meet) {
      if (this.meet.meetType == 'VERIFICATION')
        this.body = this.meet.firstBody.replace(/\n/g, "<br>");
      if (this.meet.meetType == 'ADMIN_INTERVIEW')
        this.body = this.meet.firstBody.replace(/\n/g, "<br>");
      if (this.meet.meetType == 'CLIENT_INTERVIEW')
        if (this.authStateService.hasAuthority('CLIENT'))
          this.body = this.meet.secondBody.replace(/\n/g, "<br>");
        else
          this.body = this.meet.firstBody.replace(/\n/g, "<br>");
    }
  }

  public handleCloseShowMeet(): void {
    this.eventService.dispatchEvent({eventType: EventType.CLOSE_SHOW_MEET});
  }
}
