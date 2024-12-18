import {Component, inject, Input} from '@angular/core';
import {Certification} from "../../../../../models/certification.model";
import {EventService} from "../../../../../services/event.service";
import {EventType} from "../../../../../state/event-type.enum";

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrl: './certification.component.css'
})
export class CertificationComponent {

  private eventService : EventService = inject(EventService);

  @Input()
  public certification !: Certification;

  public handleOpenEditCertification(certification : Certification) : void {
    this.eventService.dispatchEvent({eventType : EventType.OPEN_EDIT_CERTIFICATION, payload : certification});
  }

  public handleDeleteCertification(id : number) : void {
    if(confirm("Are you sure to delete this certification?"))
    this.eventService.dispatchEvent({eventType : EventType.DELETE_CERTIFICATION, payload : id});
  }


}
