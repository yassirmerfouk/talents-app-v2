import {Component, inject, Input} from '@angular/core';
import {Project} from "../../../../../models/project.model";
import {EventService} from "../../../../../services/event.service";
import {EventType} from "../../../../../state/event-type.enum";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

  private eventService: EventService = inject(EventService);

  @Input()
  public project !: Project;

  public handleOpenEditProject(project: Project): void {
    this.eventService.dispatchEvent({eventType: EventType.OPEN_EDIT_PROJECT, payload: project});
  }

  public handleDeleteProject(id: number): void {
    if (confirm("Are you sure to delete this project?"))
      this.eventService.dispatchEvent({eventType: EventType.DELETE_PROJECT, payload: id});
  }
}
