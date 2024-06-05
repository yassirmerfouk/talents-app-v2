import {Component, inject, Input, OnInit} from '@angular/core';
import {Certification} from "../../../../models/certification.model";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {ActionEvent} from "../../../../state/action-event.event";

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent implements OnInit{

  private eventService : EventService = inject(EventService);

  @Input()
  public certifications !: Array<Certification>;

  public openAddCertification : boolean = false;
  public openEditCertification : boolean = false;

  public selectedCertification !: Certification;

  public ngOnInit() : void {
    this.eventService.event$.subscribe(
      ($event : ActionEvent) => this.handleEvent($event)
    )
  }

  public handleEvent($event : ActionEvent) : void{
    switch ($event.eventType){
      case EventType.OPEN_ADD_CERTIFICATION :
        this.openAddCertification = true;
        break;
      case EventType.CLOSE_ADD_CERTIFICATION :
        this.openAddCertification = false;
        break;
      case EventType.OPEN_EDIT_CERTIFICATION :
        this.openEditCertification = true;
        this.selectedCertification = $event.payload;
        break;
      case EventType.CLOSE_EDIT_CERTIFICATION :
        this.openEditCertification = false;
        break;
    }
  }

  public handleOpenAddCertification() : void {
    this.eventService.publishEvent({
      eventType : EventType.OPEN_ADD_CERTIFICATION
    });
  }
}
