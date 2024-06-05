import {Component, inject, Input, OnInit} from '@angular/core';
import {EventService} from "../../../../services/event.service";
import {Project} from "../../../../models/project.model";
import {EventType} from "../../../../state/event-type.enum";
import {ActionEvent} from "../../../../state/action-event.event";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit{

  private eventService : EventService = inject(EventService);

  @Input()
  public projects !: Array<Project>;

  public openAddProject : boolean = false;
  public openEditProject : boolean = false;

  public selectedProject !: Project;

  public ngOnInit() : void {
    this.eventService.event$.subscribe(
      ($event : ActionEvent) => this.handleEvent($event)
    )
  }

  private handleEvent($event : ActionEvent) : void{
    switch ($event.eventType){
      case EventType.OPEN_ADD_PROJECT :
        this.openAddProject = true;
        break;
      case EventType.CLOSE_ADD_PROJECT :
        this.openAddProject = false;
        break;
      case EventType.OPEN_EDIT_PROJECT :
        this.openEditProject = true;
        this.selectedProject = $event.payload;
        break;
      case EventType.CLOSE_EDIT_PROJECT :
        this.openEditProject = false;
        break;
    }
  }

  public handleOpenAddProject() : void {
    this.eventService.publishEvent({eventType : EventType.OPEN_ADD_PROJECT})
  }
}
