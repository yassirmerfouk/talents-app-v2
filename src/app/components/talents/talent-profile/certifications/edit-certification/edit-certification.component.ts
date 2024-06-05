import {Component, inject, Input} from '@angular/core';
import {EventService} from "../../../../../services/event.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Certification} from "../../../../../models/certification.model";
import {EventType} from "../../../../../state/event-type.enum";

@Component({
  selector: 'app-edit-certification',
  templateUrl: './edit-certification.component.html',
  styleUrl: './edit-certification.component.css'
})
export class EditCertificationComponent {

  private eventService : EventService = inject(EventService);
  private formBuilder : FormBuilder = inject(FormBuilder);

  public certificationForm !: FormGroup;

  @Input()
  public certification !: Certification;

  public ngOnInit() : void {
    if(this.certification){
      this.certificationForm = this.formBuilder.group({
        id : this.formBuilder.control(this.certification.id),
        title : this.formBuilder.control(this.certification.title),
        issuedAt : this.formBuilder.control(this.certification.issuedAt),
        description : this.formBuilder.control(this.certification.description),
        resource : this.formBuilder.control(this.certification.resource),
      });
    }
  }

  public handleUpdateCertification() : void {
    let certification : Certification = this.certificationForm.value;
    this.eventService.publishEvent({
      eventType : EventType.UPDATE_CERTIFICATION,
      payload : certification
    });
  }

  public handleCloseEditCertification() : void {
    this.eventService.publishEvent({
      eventType : EventType.CLOSE_EDIT_CERTIFICATION
    });
  }
}
