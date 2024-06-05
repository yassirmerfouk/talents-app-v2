import {Component, inject, OnInit} from '@angular/core';
import {JobService} from "../../../services/job.service";
import {Job} from "../../../models/job.model";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Page} from "../../../models/page.model";
import {Application} from "../../../models/application.model";
import {AuthStateService} from "../../../services/auth.state.service";
import {Store} from "../../../state/store.service";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent implements OnInit {

  private jobService: JobService = inject(JobService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private authStateService: AuthStateService = inject(AuthStateService);

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);

  private id !: number;
  public job !: Job;

  public applicationsPage !: Page<Application>;
  private page: number = 0;
  private size: number = 10;

  public selectedApplications !: Array<Application>;

  public ngOnInit() {
    this.store.state$.subscribe(
      (state: any) => {
        this.job = state.jobsState.job;
        this.applicationsPage = state.jobsState.applicationsPage;
        this.selectedApplications = state.jobsState.selectedApplications;
      }
    );
    this.activatedRoute.params.subscribe(
      (params: any) => this.id = params['id']
    );
    if (this.id){
      this.getJob();
      this.getJobApplications();
      this.getSelectedJobApplications();
    }
  }

  public getJob(): void {
    this.eventService.dispatchEvent({eventType: EventType.GET_JOB, payload: this.id});
  }

  public getJobApplications(): void {
    if (this.authStateService.hasAuthority('ADMIN'))
      this.eventService.dispatchEvent({
        eventType: EventType.GET_JOB_APPLICATIONS,
        payload: {
          id : this.id,
          page: this.page,
          size: this.size
        }
      });
  }

  public getSelectedJobApplications(): void {
    if (
      this.authStateService.hasAuthority('CLIENT')
    )
      this.eventService.dispatchEvent({
        eventType : EventType.GET_JOB_SELECTED_APPLICATIONS,
        payload : this.id
      })
  }

  public handleOnChangeSelection(application: Application): void {
    this.jobService.selectTalentForJob(application.jobId, application.talent.id).subscribe({
      next: () => {
        application.selected = !application.selected;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public handleOnChangeApprove(application: Application): void {
    this.jobService.approveTalent(application.jobId, application.talent.id).subscribe({
      next: () => {
        application.approved = !application.approved
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public handleChangePage(page: number): void {
    this.page = page;
    this.getJobApplications();
  }

  public handlePreviousPage(): void {
    this.page--;
    this.getJobApplications();
  }

  public handleNextPage(): void {
    this.page++;
    this.getJobApplications();
  }
}
