import {Component, inject, Input} from '@angular/core';
import {EventService} from "../../../../../services/event.service";
import {EventType} from "../../../../../state/event-type.enum";
import {Education} from "../../../../../models/education.model";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {

  private eventService : EventService = inject(EventService);

  @Input()
  public education !: Education;

  public handleOpenEditEducation(education : Education) : void {
    this.eventService.publishEvent({eventType : EventType.OPEN_EDIT_EDUCATION, payload : education})
  }

  public handleDeleteEducation(id : number) : void{
    let confirmation = confirm("Vous etes sur?");
    if(confirmation)
      this.eventService.publishEvent({eventType : EventType.DELETE_EDUCATION, payload : id});
  }
}
