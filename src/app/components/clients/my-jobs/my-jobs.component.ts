import {Component, inject, OnInit} from '@angular/core';
import {JobService} from "../../../services/job.service";
import {Job, JobRequest} from "../../../models/job.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Page} from "../../../models/page.model";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {ActionEvent} from "../../../state/action-event.event";

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrl: './my-jobs.component.css'
})
export class MyJobsComponent implements OnInit{


  private eventService : EventService = inject(EventService);
  private jobService : JobService = inject(JobService);

  public jobsPage !: Page<Job>;

  public openAddJob : boolean = false;
  public openEditJob : boolean = false;
  public displayJobs : boolean = true;

  public selectedJob !: Job;

  private page : number = 0;
  private size : number = 10;

  public ngOnInit() : void {
    this.getMyJobs();
    this.eventService.event$.subscribe(
      ($event : ActionEvent) => this.handleEvent($event)
    );
  }

  public handleEvent($event : ActionEvent) : void{
    switch ($event.eventType){
      case EventType.OPEN_ADD_JOB :
        this.openAddJob = true;
        break;
      case EventType.CLOSE_ADD_JOB :
        this.openAddJob = false;
        break;
      case EventType.OPEN_EDIT_JOB :
        this.openEditJob = true;
        this.displayJobs = false;
        this.selectedJob = $event.payload;
        break;
      case EventType.CLOSE_EDIT_JOB :
        this.openEditJob = false;
        this.displayJobs = true;
        break;
      case EventType.ADD_JOB :
        this.addJob($event.payload);
        break;
      case EventType.UPDATE_JOB :
        this.updateJob($event.payload);
        break;
      case EventType.DELETE_JOB :
        this.deleteJob($event.payload);
        break;
      case EventType.CHANGE_PAGE :
        this.page = $event.payload;
        this.getMyJobs();
        break;
    }
  }

  public getMyJobs() : void {
    this.jobService.getMyJobs(this.page, this.size).subscribe({
      next : (jobsPage : Page<Job>) => {
        this.jobsPage = jobsPage;
      },
      error : (error : HttpErrorResponse) => console.log(error)
    });
  }

  public addJob(jobRequest : JobRequest) : void {
    this.jobService.addJob(jobRequest).subscribe({
      next : (job : Job) => {
        this.jobsPage.content.push(job);
      },
      error : (error : HttpErrorResponse) => console.log(error)
    })
  }

  public updateJob(jobRequest : JobRequest) : void {
    this.jobService.updateJob(jobRequest).subscribe({
      next : (job : Job) => {
        this.jobsPage.content = this.jobsPage.content.map((jb : Job) => {
          if(jb.id == jobRequest.id) jb = job;
          return jb;
        });
      },
      error : (error : HttpErrorResponse) => console.log(error)
    });
  }

  public deleteJob(id : number) : void {
    this.jobService.deleteJob(id).subscribe({
      next : () =>
        this.jobsPage.content = this.jobsPage.content.filter((job : Job) => job.id != id),
      error : (error : HttpErrorResponse) => console.log(error)
    });
  }

}
