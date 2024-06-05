import {Component, inject, Input} from '@angular/core';
import {EventService} from "../../../../../services/event.service";
import {EventType} from "../../../../../state/event-type.enum";
import {Experience} from "../../../../../models/experience.model";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {

  private eventService : EventService = inject(EventService);

  @Input()
  public experience !: Experience;

  public handleOpenEditExperience(experience : Experience) : void{
    console.log("executed");
    this.eventService.publishEvent({eventType : EventType.OPEN_EDIT_EXPERIENCE , payload : experience});
  }

  public handleDeleteExperience(id : number) : void{
    let confirmation = confirm("Vous etes sur ?");
    if(confirmation)
      this.eventService.publishEvent({eventType : EventType.DELETE_EXPERIENCE, payload : id});
  }
}
