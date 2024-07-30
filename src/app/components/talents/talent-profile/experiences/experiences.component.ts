import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {Experience} from "../../../../models/experience.model";
import {Store} from "../../../../state/store.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css'
})
export class ExperiencesComponent implements OnInit, OnDestroy{

  private store : Store = inject(Store);
  private eventService : EventService = inject(EventService);
  private stateSubscription !: Subscription;

  @Input()
  public experiences !: Array<Experience>;

  public openAddExperience : boolean = false;
  public openEditExperience : boolean = false;

  public selectedExperience !: Experience;

  public ngOnInit() : void {
    this.stateSubscription = this.store.state$.subscribe(
      (state : any) => {
        this.openAddExperience = state.experiencesState?.openAddExperience;
        this.openEditExperience = state.experiencesState?.openEditExperience;
        this.selectedExperience = state.experiencesState?.selectedExperience;
      }
    );
  }

  public handleOpenAddExperience() : void {
    this.eventService.dispatchEvent({eventType : EventType.OPEN_ADD_EXPERIENCE})
  }

  public ngOnDestroy() : void {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }
}
