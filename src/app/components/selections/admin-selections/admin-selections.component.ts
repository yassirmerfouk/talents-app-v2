import {Component, inject} from '@angular/core';
import {Store} from "../../../state/store.service";
import {EventService} from "../../../services/event.service";
import {Subscription} from "rxjs";
import {Page} from "../../../models/page.model";
import {Selection} from "../../../models/selection.model";
import {Helper} from "../../../helper/helper";
import {ErrorSuccessState} from "../../../state/states.model";
import {EventType} from "../../../state/event-type.enum";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-admin-selections',
  templateUrl: './admin-selections.component.html',
  styleUrl: './admin-selections.component.css'
})
export class AdminSelectionsComponent {

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private formBuilder: FormBuilder = inject(FormBuilder);

  private status: string = "ALL";
  private page: number = 0;
  private size: number = 10;

  public selectionsPage !: Page<Selection>;

  public filterForm !: FormGroup;


  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState: ErrorSuccessState = {};

  public ngOnInit(): void {

    this.filterForm = this.formBuilder.group({
      status: this.formBuilder.control("ALL")
    });

    this.store.state$.subscribe(
      (state: any) => {
        this.selectionsPage = state.selectionsState?.selectionsPage;
      }
    );

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);

    this.getSelections();
  }

  public getSelections(): void {
    this.eventService.dispatchEvent({
      eventType: EventType.GET_SELECTIONS,
      payload: {status: this.status, page: this.page, size: this.size}
    })
  }

  public handleChangeStatus(): void {
    this.status = this.filterForm.value.status;
    this.getSelections();
  }

  public handleChangePage(page: number): void {
    this.page = page;
    this.getSelections();
  }

  public handlePreviousPage(): void {
    this.page--;
    this.getSelections();
  }

  public handleNextPage(): void {
    this.page++;
    this.getSelections();
  }

  public ngOnDestroy(): void {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
    if (this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }
}
