import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Page} from "../../../models/page.model";
import {Talent} from "../../../models/talent.model";
import {Store} from "../../../state/store.service";
import {EventService} from "../../../services/event.service";
import {Subscription} from "rxjs";
import {EventType} from "../../../state/event-type.enum";
import {Helper} from "../../../helper/helper";
import {ErrorSuccessState} from "../../../state/states.model";

@Component({
  selector: 'app-talents',
  templateUrl: './talents.component.html',
  styleUrl: './talents.component.css'
})
export class TalentsComponent implements OnInit, OnDestroy{

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  public talentsPage !:  Page<Talent>;

  private page : number = 0;
  private size : number = 10;

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState : ErrorSuccessState = {};


  public ngOnInit() : void {

    this.stateSubscription = this.store.state$.subscribe(
      (state : any) => {
        this.talentsPage = state.talentsState.talentsPage;
      }
    );

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);

    this.getTalents();
  }

  public getTalents() : void {
    this.eventService.dispatchEvent({eventType : EventType.GET_TALENTS, payload : {status : 'VERIFIED', page : this.page, size : this.size}});
  }

  public handleChangePage(page: number): void {
    this.page = page;
    this.getTalents();
  }

  public handlePreviousPage(): void {
    this.page--;
    this.getTalents();
  }

  public handleNextPage(): void {
    this.page++;
    this.getTalents();
  }

  public ngOnDestroy() {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
    if(this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }
}
