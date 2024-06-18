import {Component, inject, Input, OnInit} from '@angular/core';
import {Meet} from "../../../../models/meet.model";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrl: './meet.component.css'
})
export class MeetComponent implements OnInit{

  private eventService : EventService = inject(EventService);

  @Input()
  public meet !: Meet;

  public ngOnInit() : void {
    console.log(this.meet);
  }

  public handleCloseShowMeet() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_SHOW_MEET});
  }
}
