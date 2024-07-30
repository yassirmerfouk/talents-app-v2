import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from "../../../state/store.service";
import {EventService} from "../../../services/event.service";
import {Subscription} from "rxjs";
import {Page} from "../../../models/page.model";
import {Meet} from "../../../models/meet.model";
import {EventType} from "../../../state/event-type.enum";
import {AuthStateService} from "../../../services/auth.state.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Helper} from "../../../helper/helper";
import {ErrorSuccessState} from "../../../state/states.model";

@Component({
  selector: 'app-meets',
  templateUrl: './meets.component.html',
  styleUrl: './meets.component.css'
})
export class MeetsComponent implements OnInit, OnDestroy{

  private store : Store = inject(Store);
  private eventService : EventService = inject(EventService);
  private stateSubscription : Subscription | null = null;

  public authState : AuthStateService = inject(AuthStateService);

  private formBuilder : FormBuilder = inject(FormBuilder);

  public meetsPage !: Page<Meet>;

  private date : string = "";
  private page : number = 0;
  private size : number = 10;

  public filterForm !: FormGroup;

  public openMeet : boolean = false;
  public selectedMeet !: Meet;

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState : ErrorSuccessState = {};

  public ngOnInit() : void {

    this.stateSubscription = this.store.state$.subscribe(
      (state : any) => {
        this.meetsPage = state.meetsState?.meetsPage;
        this.openMeet = state.meetsState?.openMeet;
        this.selectedMeet = state.meetsState?.selectedMeet;
      }
    );

    this.filterForm = this.formBuilder.group({
      date : this.formBuilder.control(null)
    });

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);

    this.getMeets();
  }

  public getMeets() : void {
    this.eventService.dispatchEvent({
      eventType : EventType.GET_MEETS,
      payload : {
        date : this.date,
        page : this.page,
        size : this.size
      }
    })
  }

  public openShowMeet(meet : Meet) : void {
    this.eventService.dispatchEvent({eventType : EventType.OPEN_SHOW_MEET, payload : meet});
  }

  public acceptMeet(meet : Meet) : void {
    if(confirm("Are you sure to accept this meet?"))
    this.eventService.dispatchEvent({eventType : EventType.ACCEPT_MEET, payload : meet});
  }

  public refuseMeet(meet : Meet) : void {
    if(confirm("Are you sure to refuse this meet?"))
    this.eventService.dispatchEvent({eventType : EventType.REFUSE_MEET, payload : meet});
  }

  public closeMeet(meet : Meet) : void {
    if(confirm("Are you sure to close this meet?"))
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_MEET, payload : meet});
  }

  public handleOnFilter() : void {
    this.date = this.filterForm.value.date;
    this.getMeets();
  }

  public handleChangePage(page: number): void {
    this.page = page;
    this.getMeets();
  }

  public handlePreviousPage(): void {
    this.page--;
    this.getMeets();
  }

  public handleNextPage(): void {
    this.page++;
    this.getMeets();
  }

  public ngOnDestroy() : void {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
    if(this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }

}
