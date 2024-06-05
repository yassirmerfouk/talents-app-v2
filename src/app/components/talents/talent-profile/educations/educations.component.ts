import {Component, inject, Input, OnInit} from '@angular/core';
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {ActionEvent} from "../../../../state/action-event.event";
import {Education} from "../../../../models/education.model";

@Component({
  selector: 'app-educations',
  templateUrl: './educations.component.html',
  styleUrl: './educations.component.css'
})
export class EducationsComponent implements OnInit{

  private eventService : EventService = inject(EventService);

  @Input()
  public educations !: Array<Education>;

  public openAddEducation : boolean = false;
  public openEditEducation : boolean = false;

  public selectedEducation !: Education;

  public ngOnInit() : void {
    this.eventService.event$.subscribe({
    next : ($event : ActionEvent) => this.handleEvent($event)
    });
  }

  private handleEvent($event : ActionEvent) : void{
    switch ($event.eventType){
      case EventType.OPEN_ADD_EDUCATION :
        this.openAddEducation = true;
        break;
      case EventType.CLOSE_ADD_EDUCATION :
        this.openAddEducation = false;
        break;
      case EventType.OPEN_EDIT_EDUCATION :
        this.openEditEducation = true;
        this.selectedEducation = $event.payload;
        break;
      case EventType.CLOSE_EDIT_EDUCATION :
        this.openEditEducation = false;
        break;
    }
  }

  public handleOpenAddEducation() : void{
    this.eventService.publishEvent({eventType : EventType.OPEN_ADD_EDUCATION});
  }
}
