import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Job} from "../../../../models/job.model";
import {Page} from "../../../../models/page.model";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {Store} from "../../../../state/store.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-my-jobs-list',
  templateUrl: './my-jobs-list.component.html',
  styleUrl: './my-jobs-list.component.css'
})
export class MyJobsListComponent implements OnInit, OnDestroy{

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  public jobsPage !: Page<Job>;

  private page: number = 0;
  private size: number = 10;

  public ngOnInit() : void {

    this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {
        this.jobsPage = state.jobsState.jobsPage;
      }
    );

    this.getMyJobs();

  }

  public getMyJobs(): void {
    this.eventService.dispatchEvent({
      eventType: EventType.GET_MY_JOBS,
      payload: {page: this.page, size: this.size}
    })
  }

  public handleOpenAddJob() : void {
    this.eventService.dispatchEvent({eventType : EventType.OPEN_ADD_JOB});
  }

  public handleOpenEditJob(job : Job) : void{
    this.eventService.dispatchEvent({eventType : EventType.OPEN_EDIT_JOB, payload : job});
  }

  public handleDeleteJob(id : number) : void {
    this.eventService.publishEvent({
      eventType : EventType.DELETE_JOB,
      payload : id
    });
  }


  public handleChangePage(page : number) : void {
    this.page = page;
    this.getMyJobs();
  }

  public handlePreviousPage() : void {

  }

  public handleNextPage() : void{

  }

  public ngOnDestroy() {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }

}
