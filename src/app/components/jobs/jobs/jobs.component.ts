import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Page} from "../../../models/page.model";
import {Job} from "../../../models/job.model";
import {JobService} from "../../../services/job.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActionEvent} from "../../../state/action-event.event";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit, OnDestroy {

  private jobService: JobService = inject(JobService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private eventService: EventService = inject(EventService);


  public jobsPage !: Page<Job>;

  private keyword: string = "";
  private page: number = 0;
  private size: number = 10;

  public searchForm !: FormGroup;

  public openJob: boolean = false;

  public selectedJob !: Job;

  public ngOnInit(): void {
    console.log("jobs created");
    this.searchForm = this.formBuilder.group({
      keyword: this.formBuilder.control("")
    });
    this.searchJobs();
    this.eventService.event$.subscribe(
      ($event: ActionEvent) => this.handleEvent($event)
    );
  }

  public handleEvent($event: ActionEvent): void {
    switch ($event.eventType) {
      case EventType.OPEN_JOB :
        this.openJob = true;
        this.selectedJob = $event.payload;
        break;
      case EventType.CLOSE_JOB :
        this.openJob = false;
        break;
      case EventType.APPLY_TO_JOB :
        this.applyToJob($event.payload);
        break;
    }
  }

  public searchJobs(): void {
    this.jobService.searchJobs(this.keyword, this.page, this.size).subscribe({
      next: (jobsPage: Page<Job>) => {
        this.jobsPage = jobsPage;
      }
    });
  }

  public applyToJob(id: number): void {
    this.jobService.applyToJob(id).subscribe({
      next: () => {
        console.log("apply success");
        this.selectedJob.applied = true;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public handleSearchJobs(): void {
    this.keyword = this.searchForm.value.keyword;
    this.searchJobs();
  }

  public handleChangePage(page: number): void {
    this.page = page;
    this.searchJobs();
  }

  public handlePreviousPage(): void {
    this.page--;
    this.searchJobs();
  }

  public handleNextPage(): void {
    this.page++;
    this.searchJobs();
  }

  public handleOpenJob(job: Job): void {
    this.eventService.publishEvent({eventType: EventType.OPEN_JOB, payload: job});
  }

  public ngOnDestroy() {
    /*console.log("Jobs destroyed");*/
  }

}
