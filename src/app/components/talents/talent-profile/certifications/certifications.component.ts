import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Certification} from "../../../../models/certification.model";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {Store} from "../../../../state/store.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent implements OnInit, OnDestroy{

  private store : Store = inject(Store);
  private eventService : EventService = inject(EventService);
  private stateSubscription !: Subscription;

  @Input()
  public certifications !: Array<Certification>;

  public openAddCertification : boolean = false;
  public openEditCertification : boolean = false;

  public selectedCertification !: Certification;

  public ngOnInit() : void {

    this.stateSubscription = this.store.state$.subscribe(
      (state : any) => {
        this.openAddCertification = state.certificationsState?.openAddCertification;
        this.openEditCertification = state.certificationsState?.openEditCertification;
        this.selectedCertification = state.certificationsState?.selectedCertification;
      }
    );

  }
  public handleOpenAddCertification() : void {
    this.eventService.dispatchEvent({eventType : EventType.OPEN_ADD_CERTIFICATION});
  }

  public ngOnDestroy() {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }
}
