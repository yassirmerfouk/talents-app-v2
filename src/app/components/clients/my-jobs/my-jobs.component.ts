import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Job} from "../../../models/job.model";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {Store} from "../../../state/store.service";
import {Subscription} from "rxjs";
import {Page} from "../../../models/page.model";
import {AuthStateService} from "../../../services/auth.state.service";
import {Helper} from "../../../helper/helper";
import {ErrorSuccessState} from "../../../state/states.model";

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrl: './my-jobs.component.css'
})
export class MyJobsComponent implements OnInit, OnDestroy {


  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  public authStateService: AuthStateService = inject(AuthStateService);

  public openAddJob: boolean = false;
  public openEditJob: boolean = false;

  public selectedJob !: Job;

  public jobsPage !: Page<Job>;
  private page: number = 0;
  private size: number = 10;

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState: ErrorSuccessState = {};

  public ngOnInit(): void {

    this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {
        this.jobsPage = state.jobsState?.jobsPage;
        this.openAddJob = state.jobsState?.openAddJob;
        this.openEditJob = state.jobsState?.openEditJob;
        this.selectedJob = state.jobsState?.selectedJob;
      }
    );

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);


    this.getMyJobs();

  }

  public getMyJobs(): void {
    this.eventService.dispatchEvent({eventType: EventType.GET_MY_JOBS, payload: {page: this.page, size: this.size}});
  }

  public handleOpenAddJob(): void {
    this.eventService.dispatchEvent({eventType: EventType.OPEN_ADD_JOB});
  }

  public handleOpenEditJob(job: Job): void {
    this.eventService.dispatchEvent({eventType: EventType.OPEN_EDIT_JOB, payload: job});
  }

  public handleDeleteJob(id: number): void {
    if (confirm("Are you sure for delete this job?"))
      this.eventService.dispatchEvent({eventType: EventType.DELETE_JOB, payload: id});
  }

  public handleAskToStartSelection(job: Job): void {
    if (confirm("Are you sure for ask to start selection for this job?"))
      this.eventService.dispatchEvent({eventType: EventType.ASK_TO_START_SELECTION, payload: job});
  }


  public handleChangePage(page: number): void {
    this.page = page;
    this.getMyJobs();
  }

  public handlePreviousPage(): void {

  }

  public handleNextPage(): void {

  }

  public ngOnDestroy(): void {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
    if (this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }

}
