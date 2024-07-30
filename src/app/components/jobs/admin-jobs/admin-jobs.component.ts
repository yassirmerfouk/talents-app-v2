import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Page} from "../../../models/page.model";
import {Job} from "../../../models/job.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventService} from "../../../services/event.service";
import {Store} from "../../../state/store.service";
import {EventType} from "../../../state/event-type.enum";
import {Subscription} from "rxjs";
import {NgToastService} from "ng-angular-popup";
import {Helper} from "../../../helper/helper";
import {ErrorSuccessState} from "../../../state/states.model";

@Component({
  selector: 'app-admin-jobs',
  templateUrl: './admin-jobs.component.html',
  styleUrl: './admin-jobs.component.css'
})
export class AdminJobsComponent implements OnInit, OnDestroy {

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private formBuilder: FormBuilder = inject(FormBuilder);

  public filterForm !: FormGroup;

  public jobsPage !: Page<Job>;

  private status: string = "all";
  private page: number = 0;
  private size: number = 10;

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState: ErrorSuccessState = {};


  public ngOnInit(): void {

    this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {
        this.jobsPage = state.jobsState?.jobsPage;
      }
    );

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);

    this.filterForm = this.formBuilder.group({
      status: this.formBuilder.control("all")
    });

    this.getJobs();
  }

  public getJobs(): void {
    this.eventService.dispatchEvent({
      eventType: EventType.GET_JOBS,
      payload: {status: this.status, page: this.page, size: this.size}
    });
  }

  public handleChangeStatus(): void {
    this.status = this.filterForm.value.status;
    this.page = 0;
    this.getJobs();
  }

  public handleChangePage(page: number): void {
    this.page = page;
    this.getJobs();
  }

  public handlePreviousPage(): void {
    this.page--;
    this.getJobs();
  }

  public handleNextPage(): void {
    this.page++;
    this.getJobs();
  }

  public ngOnDestroy(): void {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
    if(this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }
}
