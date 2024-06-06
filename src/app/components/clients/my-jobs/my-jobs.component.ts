import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Job} from "../../../models/job.model";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {Store} from "../../../state/store.service";
import {Subscription} from "rxjs";
import {Page} from "../../../models/page.model";

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrl: './my-jobs.component.css'
})
export class MyJobsComponent implements OnInit, OnDestroy {


  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  public openAddJob: boolean = false;
  public openEditJob: boolean = false;
  public displayJobs: boolean = true;

  public selectedJob !: Job;

  public jobsPage !: Page<Job>;
  private page: number = 0;
  private size: number = 10;


  public ngOnInit(): void {

    this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {
        this.jobsPage = state.jobsState.jobsPage;
        this.openAddJob = state.jobsState.openAddJob;
        this.openEditJob = state.jobsState.openEditJob;
        this.displayJobs = state.jobsState.displayJobs;
        this.selectedJob = state.jobsState.selectedJob;
      }
    );

    this.getMyJobs();

  }

  public getMyJobs(): void {
    this.eventService.dispatchEvent({eventType: EventType.GET_MY_JOBS, payload: {page: this.page, size: this.size}});
  }

  public handleOpenAddJob() : void {
    this.eventService.dispatchEvent({eventType : EventType.OPEN_ADD_JOB});
  }

  public handleOpenEditJob(job : Job) : void{
    this.eventService.dispatchEvent({eventType : EventType.OPEN_EDIT_JOB, payload : job});
  }

  public handleDeleteJob(id : number) : void {
    this.eventService.dispatchEvent({eventType : EventType.DELETE_JOB, payload : id});
  }


  public handleChangePage(page : number) : void {
    this.page = page;
    this.getMyJobs();
  }

  public handlePreviousPage() : void {

  }

  public handleNextPage() : void{

  }

  public ngOnDestroy(): void {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }

}
