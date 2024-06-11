import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {Store} from "../../../../state/store.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit, OnDestroy{

  private store : Store = inject(Store);
  private eventService : EventService = inject(EventService);
  private stateSubscription : Subscription | null = null;

  @Input()
  public skills : Array<string> | null = null;

  public openEditSkills : boolean = false;

  public ngOnInit() {
    this.stateSubscription = this.store.state$.subscribe(
      (state : any) => {
        this.openEditSkills = state.skillsState?.openEditSkills;
      }
    );
  }

  public handleOpenEditSkills() : void {
    this.eventService.dispatchEvent({eventType : EventType.OPEN_EDIT_SKILLS});
  }

  public ngOnDestroy() {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }
}
