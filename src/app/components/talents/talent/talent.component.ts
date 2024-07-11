import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {TalentService} from "../../../services/talent.service";
import {ActivatedRoute} from "@angular/router";
import {Talent} from "../../../models/talent.model";
import {Store} from "../../../state/store.service";
import {EventService} from "../../../services/event.service";
import {Subscription} from "rxjs";
import {EventType} from "../../../state/event-type.enum";
import {Helper} from "../../../helper/helper";

@Component({
  selector: 'app-talent',
  templateUrl: './talent.component.html',
  styleUrl: './talent.component.css'
})
export class TalentComponent implements OnInit, OnDestroy {

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  public helper : Helper = inject(Helper);

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  private id !: number;
  public talent !: Talent;

  public ngOnInit(): void {

    this.stateSubscription = this.store.state$.subscribe(
      (state : any) => {
        this.talent = state.talentState.talent;
      }
    );

    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        if(this.id)
          this.eventService.dispatchEvent({eventType : EventType.GET_TALENT, payload : this.id});
      }
    );
  }

  public ngOnDestroy() {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }

}
