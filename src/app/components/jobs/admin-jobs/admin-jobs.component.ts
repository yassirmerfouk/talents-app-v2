import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Page} from "../../../models/page.model";
import {Job} from "../../../models/job.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventService} from "../../../services/event.service";
import {Store} from "../../../state/store.service";
import {EventType} from "../../../state/event-type.enum";
import {Subscription} from "rxjs";
import {NgToastService} from "ng-angular-popup";

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

  public error !: string;

  private status: string = "all";
  private page: number = 0;
  private size: number = 10;

  private toast : NgToastService = inject(NgToastService);

  public ngOnInit(): void {

  this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {
        this.jobsPage = state.jobsState.jobsPage;
        this.error = state.jobsState.error;
        if(this.error)
          this.toast.danger(this.error);
      }
    );

    this.filterForm = this.formBuilder.group({
      status: this.formBuilder.control("all")
    });

    this.getJobs();
  }

  public getJobs() : void {
    this.eventService.dispatchEvent({eventType: EventType.GET_JOBS, payload: {status: this.status, page: this.page, size: this.size}});
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

  public ngOnDestroy() : void {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }
}
