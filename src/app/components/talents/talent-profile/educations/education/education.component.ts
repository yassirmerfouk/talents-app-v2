import {Component, inject, Input} from '@angular/core';
import {EventService} from "../../../../../services/event.service";
import {EventType} from "../../../../../state/event-type.enum";
import {Education} from "../../../../../models/education.model";
import {Helper} from "../../../../../helper/helper";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {

  private eventService: EventService = inject(EventService);

  public helper: Helper = inject(Helper);

  @Input()
  public education !: Education;

  public handleOpenEditEducation(education: Education): void {
    this.eventService.dispatchEvent({eventType: EventType.OPEN_EDIT_EDUCATION, payload: education})
  }

  public handleDeleteEducation(id: number): void {
    if (confirm("Are you sure to delete this education?"))
      this.eventService.dispatchEvent({eventType: EventType.DELETE_EDUCATION, payload: id});
  }
}
