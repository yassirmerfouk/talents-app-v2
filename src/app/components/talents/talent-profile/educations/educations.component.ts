import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {Education} from "../../../../models/education.model";
import {Store} from "../../../../state/store.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-educations',
  templateUrl: './educations.component.html',
  styleUrl: './educations.component.css'
})
export class EducationsComponent implements OnInit, OnDestroy{

  private store : Store = inject(Store);
  private eventService : EventService = inject(EventService);
  private stateSubscription !: Subscription;

  @Input()
  public educations !: Array<Education>;

  public openAddEducation : boolean = false;
  public openEditEducation : boolean = false;

  public selectedEducation !: Education;

  public ngOnInit() : void {
    this.stateSubscription = this.store.state$.subscribe(
      (state : any) => {
        this.openAddEducation = state.educationsState?.openAddEducation;
        this.openEditEducation = state.educationsState?.openEditEducation;
        this.selectedEducation = state.educationsState?.selectedEducation;
      }
    );
  }


  public handleOpenAddEducation() : void{
    this.eventService.dispatchEvent({eventType : EventType.OPEN_ADD_EDUCATION});
  }

  public ngOnDestroy() : void {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }
}
