import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Certification} from "../../../../../models/certification.model";
import {EventService} from "../../../../../services/event.service";
import {EventType} from "../../../../../state/event-type.enum";

@Component({
  selector: 'app-add-certification',
  templateUrl: './add-certification.component.html',
  styleUrl: './add-certification.component.css'
})
export class AddCertificationComponent implements OnInit{

  private eventService : EventService = inject(EventService);
  private formBuilder : FormBuilder = inject(FormBuilder);

  public certificationForm !: FormGroup;

  public ngOnInit() : void {

    this.certificationForm = this.formBuilder.group({
      title : this.formBuilder.control(null),
      issuedAt : this.formBuilder.control(null),
      description : this.formBuilder.control(null),
      resource : this.formBuilder.control(null),
    });

  }

  public handleAddCertification() : void {
    let certification : Certification = this.certificationForm.value;
    this.eventService.dispatchEvent({eventType : EventType.ADD_CERTIFICATION, payload : certification});
  }

  public handleCloseAddCertification() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_ADD_CERTIFICATION});
  }
}
