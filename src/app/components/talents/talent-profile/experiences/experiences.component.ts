import {Component, inject, Input, OnInit} from '@angular/core';
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {ActionEvent} from "../../../../state/action-event.event";
import {Experience} from "../../../../models/experience.model";

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css'
})
export class ExperiencesComponent implements OnInit{

  private eventService : EventService = inject(EventService);

  @Input()
  public experiences !: Array<Experience>;

  public openAddExperience : boolean = false;
  public openEditExperience : boolean = false;

  public selectedExperience !: Experience;

  public ngOnInit() : void {
    this.eventService.event$.subscribe({
      next : ($event : ActionEvent) => this.handleEvent($event)
    });
  }

  private handleEvent($event : ActionEvent) : void {
    switch ($event.eventType){
      case EventType.OPEN_ADD_EXPERIENCE :
        this.openAddExperience = true;
        break;
      case EventType.CLOSE_ADD_EXPERIENCE :
        this.openAddExperience = false;
        break;
      case EventType.OPEN_EDIT_EXPERIENCE :
        this.openEditExperience = true;
        this.selectedExperience = $event.payload;
        break;
      case EventType.CLOSE_EDIT_EXPERIENCE :
        this.openEditExperience = false;
        break;
    }
  }

  public handleOpenAddExperience() : void {
    this.eventService.publishEvent({eventType : EventType.OPEN_ADD_EXPERIENCE})
  }
}
