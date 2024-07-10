import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from "../../../state/store.service";
import {EventService} from "../../../services/event.service";
import {Subscription} from "rxjs";
import {Page} from "../../../models/page.model";
import {Meet} from "../../../models/meet.model";
import {EventType} from "../../../state/event-type.enum";
import {AuthStateService} from "../../../services/auth.state.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {format} from "date-fns";

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

  public ngOnInit() : void {

    this.stateSubscription = this.store.state$.subscribe(
      (state : any) => {
        this.meetsPage = state.meetsState?.meetsPage;
        this.openMeet = state.meetsState?.openMeet;
        this.selectedMeet = state.meetsState?.selectedMeet;
      }
    );

    this.filterForm = this.formBuilder.group({
      /*date : this.formBuilder.control(format(new Date(), 'yyyy-MM-dd'))*/
      date : this.formBuilder.control(null)
    });

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
    this.eventService.dispatchEvent({eventType : EventType.ACCEPT_MEET, payload : meet});
  }

  public refuseMeet(meet : Meet) : void {
    this.eventService.dispatchEvent({eventType : EventType.REFUSE_MEET, payload : meet});
  }

  public closeMeet(meet : Meet) : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_MEET, payload : meet});
  }

  public handleOnFilter() : void {
    this.date = this.filterForm.value.date;
    this.getMeets();
  }

  public handleChangePage(page: number): void {
    this.page = page;
  }

  public handlePreviousPage(): void {
    this.page--;
  }

  public handleNextPage(): void {
    this.page++;
  }

  public ngOnDestroy() : void {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }

}
