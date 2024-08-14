import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from "../../../state/store.service";
import {EventService} from "../../../services/event.service";
import {Subscription} from "rxjs";
import {Helper} from "../../../helper/helper";
import {ErrorSuccessState} from "../../../state/states.model";
import {EventType} from "../../../state/event-type.enum";
import {Page} from "../../../models/page.model";
import {Selection} from "../../../models/selection.model";

@Component({
  selector: 'app-client-selections',
  templateUrl: './client-selections.component.html',
  styleUrl: './client-selections.component.css'
})
export class ClientSelectionsComponent implements OnInit, OnDestroy {

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private page: number = 0;
  private size: number = 10;

  public selectionsPage !: Page<Selection>;


  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState: ErrorSuccessState = {};

  public ngOnInit(): void {

    this.store.state$.subscribe(
      (state: any) => {
        this.selectionsPage = state.mySelectionsState?.selectionsPage;
        if (this.selectionsPage)
          console.log(this.selectionsPage);
      }
    );

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);

    this.getMySelections();
  }

  public getMySelections(): void {
    this.eventService.dispatchEvent({
      eventType: EventType.GET_MY_SELECTIONS,
      payload: {page: this.page, size: this.size}
    })
  }

  public handleChangePage(page: number): void {
    this.page = page;
    this.getMySelections();
  }

  public handlePreviousPage(): void {
    this.page--;
    this.getMySelections();
  }

  public handleNextPage(): void {
    this.page++;
    this.getMySelections();
  }

  public ngOnDestroy(): void {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
    if (this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }
}
