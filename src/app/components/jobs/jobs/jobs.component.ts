import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Page} from "../../../models/page.model";
import {Job} from "../../../models/job.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {Store} from "../../../state/store.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit, OnDestroy {

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private formBuilder: FormBuilder = inject(FormBuilder);

  public jobsPage !: Page<Job>;

  private keyword: string = "";
  private page: number = 0;
  private size: number = 10;

  public searchForm !: FormGroup;

  public openJob: boolean = false;

  public selectedJob !: Job;

  public error !: string;

  public ngOnInit(): void {

    this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {
        this.jobsPage = state.jobsState.jobsPage;
        this.openJob = state.jobsState.openJob;
        this.selectedJob = state.jobsState.selectedJob;
        this.error = state.jobsState.error;
      }
    );

    this.searchForm = this.formBuilder.group({
      keyword: this.formBuilder.control("")
    });

    this.searchJobs();
  }

  public searchJobs(): void {
    this.eventService.dispatchEvent({
      eventType : EventType.SEARCH_JOBS,
      payload : {
        keyword : this.keyword,
        page : this.page,
        size : this.size
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
    this.eventService.dispatchEvent({eventType: EventType.OPEN_JOB, payload: job});
  }

  public ngOnDestroy() {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }

}
