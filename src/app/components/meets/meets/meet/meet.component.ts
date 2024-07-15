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
  public body !: string;

  public ngOnInit() : void {
    if(this.meet)
        this.body = this.meet.firstBody.replace(/\n/g, "<br>");
  }

  public handleCloseShowMeet() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_SHOW_MEET});
  }
}
