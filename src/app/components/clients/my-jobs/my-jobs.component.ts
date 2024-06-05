import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {JobService} from "../../../services/job.service";
import {Job, JobRequest} from "../../../models/job.model";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {ActionEvent} from "../../../state/action-event.event";
import {Store} from "../../../state/store.service";
import {Subscription} from "rxjs";

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

  public ngOnInit(): void {

    this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {
        this.openAddJob = state.jobsState.openAddJob;
        this.openEditJob = state.jobsState.openEditJob;
        this.displayJobs = state.jobsState.displayJobs;
        this.selectedJob = state.jobsState.selectedJob;
      }
    );

  }

  public addJob(jobRequest: JobRequest): void {
    /*this.jobService.addJob(jobRequest).subscribe({
      next: (job: Job) => {
        this.jobsPage.content.push(job);
      },
      error: (error: HttpErrorResponse) => console.log(error)
    })*/
  }

  public updateJob(jobRequest: JobRequest): void {
    /*this.jobService.updateJob(jobRequest).subscribe({
      next: (job: Job) => {
        this.jobsPage.content = this.jobsPage.content.map((jb: Job) => {
          if (jb.id == jobRequest.id) jb = job;
          return jb;
        });
      },
      error: (error: HttpErrorResponse) => console.log(error)
    });*/
  }

  public deleteJob(id: number): void {
    /*this.jobService.deleteJob(id).subscribe({
      next: () =>
        this.jobsPage.content = this.jobsPage.content.filter((job: Job) => job.id != id),
      error: (error: HttpErrorResponse) => console.log(error)
    });*/
  }

  public ngOnDestroy(): void {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }

}
