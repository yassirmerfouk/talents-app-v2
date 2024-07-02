import {Component, inject, Input, OnInit} from '@angular/core';
import {Application} from "../../../../models/application.model";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";

@Component({
  selector: 'app-application-stats',
  templateUrl: './application-stats.component.html',
  styleUrl: './application-stats.component.css'
})
export class ApplicationStatsComponent implements OnInit{

  private eventService : EventService = inject((EventService));

  @Input()
  public application !: Application;

  public title !: string;

  public ngOnInit() : void {
    this.title = "Application stats for " + this.application.talent.firstName + " " + this.application.talent.lastName;
  }

  public handleCloseGetStats() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_GET_APPLICATION_STATS});
  }
}
