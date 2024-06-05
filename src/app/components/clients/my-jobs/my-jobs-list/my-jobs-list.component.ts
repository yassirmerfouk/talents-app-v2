import {Component, inject, Input, OnInit} from '@angular/core';
import {Job} from "../../../../models/job.model";
import {Page} from "../../../../models/page.model";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";

@Component({
  selector: 'app-my-jobs-list',
  templateUrl: './my-jobs-list.component.html',
  styleUrl: './my-jobs-list.component.css'
})
export class MyJobsListComponent implements OnInit{

  private eventService : EventService = inject(EventService);

  @Input()
  public jobsPage !: Page<Job>;

  public ngOnInit() : void {

  }

  public handleOpenEditJob(job : Job) : void{
    this.eventService.publishEvent({
      eventType : EventType.OPEN_EDIT_JOB,
      payload : job
    });
  }

  public handleDeleteJob(id : number) : void {
    this.eventService.publishEvent({
      eventType : EventType.DELETE_JOB,
      payload : id
    });
  }

  public handleOpenAddJob() : void {
    this.eventService.publishEvent({eventType : EventType.OPEN_ADD_JOB});
  }

  public handleChangePage(page : number) : void {
    this.eventService.publishEvent({eventType : EventType.CHANGE_PAGE, payload : page});
  }

  public handlePreviousPage() : void {

  }

  public handleNextPage() : void{

  }

}
