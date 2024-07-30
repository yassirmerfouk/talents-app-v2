import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Job} from "../../../models/job.model";
import {ActivatedRoute} from "@angular/router";
import {Page} from "../../../models/page.model";
import {Application} from "../../../models/application.model";
import {AuthStateService} from "../../../services/auth.state.service";
import {Store} from "../../../state/store.service";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {Subscription} from "rxjs";
import {User} from "../../../models/user.model";
import {JobInterview} from "../../../models/job.interview.model";
import {Helper} from "../../../helper/helper";
import {ErrorSuccessState} from "../../../state/states.model";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent implements OnInit, OnDestroy {

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  public authStateService: AuthStateService = inject(AuthStateService);


  private id !: number;
  public job !: Job;

  public applicationsPage !: Page<Application>;
  private page: number = 0;
  private size: number = 10;

  public selectedApplications !: Array<Application>;

  public openProgramMeet: boolean = false;

  public selectedUser !: User;

  public openGetStats: boolean = false;

  public selectedApplication !: Application;

  public openAskForJobInterview: boolean = false;

  public selectedApp !: Application;

  public openJobInterview: boolean = false;

  public selectedAppForInterviews !: Application;

  public programClientMeet: any;

  public status: string = "";

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState: ErrorSuccessState = {};

  public ngOnInit() {

    this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {
        this.job = state.jobsState?.job;
        this.applicationsPage = state.jobsState?.applicationsPage;
        this.selectedApplications = state.jobsState?.selectedApplications;

        this.openProgramMeet = state.meetState?.openProgramMeet;
        this.selectedUser = state.meetState?.selectedUser;

        this.openGetStats = state.statsState?.openGetStats;
        this.selectedApplication = state.statsState?.selectedApplication;

        this.openAskForJobInterview = state.jobInterviewsState?.openAskForJobInterview;
        this.selectedApp = state.jobInterviewsState?.selectedApp;

        this.openJobInterview = state.jobInterviewState?.openJobInterview;
        this.selectedAppForInterviews = state.jobInterviewState?.selectedApplication;

        this.programClientMeet = state.programClientMeet;

      }
    );

    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        if (this.id) {
          this.getJob();
          setTimeout(() => {
            this.getJobApplications();
            this.getSelectedJobApplications();
          }, 500);
        }
      }
    );

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);

  }

  public getJob(): void {
    this.eventService.dispatchEvent({eventType: EventType.GET_JOB, payload: this.id});
  }

  public getJobApplications(): void {
    if (this.authStateService.hasAuthority('ADMIN'))
      this.eventService.dispatchEvent({
        eventType: EventType.GET_JOB_APPLICATIONS,
        payload: {id: this.id, status: this.status, page: this.page, size: this.size}
      });
  }

  public getSelectedJobApplications(): void {
    if (this.authStateService.hasAuthority('CLIENT') && (this.job.status == 'IN_APPROVING' || this.job.status == 'CLIENT_CLOSE' || this.job.status == 'ADMIN_CLOSE'))
      this.eventService.dispatchEvent({eventType: EventType.GET_JOB_SELECTED_APPLICATIONS, payload: this.id});
  }

  public handleOnChangeStatus($event: any): void {
    this.status = $event.target.value;
    this.getJobApplications();
  }

  public handleAskToStartSelection(job: Job): void {
    if (confirm("Are you sure to ask to start selection for this job?"))
      this.eventService.dispatchEvent({eventType: EventType.ASK_TO_START_SELECTION, payload: job});
  }

  public handleStartSelection(job: Job): void {
    if (confirm("Are you sure to start selection for this job?"))
      this.eventService.dispatchEvent({eventType: EventType.START_SELECTION, payload: job});
  }

  public handleStartApproving(job: Job): void {
    if (confirm("Are you sure to ask to start approving for this job?"))
      this.eventService.dispatchEvent({eventType: EventType.START_APPROVING, payload: job});
  }

  public handleCloseJob(job: Job): void {
    if (confirm("Are you sure to close this job?"))
      this.eventService.dispatchEvent({eventType: EventType.CLOSE_JOB_PROCESS, payload: job})
  }

  public handleOnChangeSelection(application: Application): void {
    if (confirm("Are you sure to change selection status for this talents?"))
      this.eventService.dispatchEvent({eventType: EventType.SELECT_TALENT, payload: application});
  }

  public handleOnApprove(application: Application): void {
    if (confirm("Are you sure to approve this talent for this job?"))
    this.eventService.dispatchEvent({eventType: EventType.APPROVE_TALENT, payload: application});
  }

  public handleOnRefuse(application: Application): void {
    if (confirm("Are you sure to refuse this talent for this job?"))
    this.eventService.dispatchEvent({eventType: EventType.REFUSE_TALENT, payload: application});
  }

  public handleOpenProgramMeet(application: Application): void {
    if (application.hasAdminMeet)
      alert("You have already programmed a meet with this talent!");
    else
      this.eventService.dispatchEvent({eventType: EventType.OPEN_ADD_MEET, payload: application.talent});
  }

  public handleOpenGetStats(application: Application): void {
    this.eventService.dispatchEvent({eventType: EventType.OPEN_GET_APPLICATION_STATS, payload: application});
  }

  public handleOpenAskForJobInterview(application: Application): void {
    if (application.hasClientMeet)
      alert("You have already request for a meet for this talent!");
    else
      this.eventService.dispatchEvent({eventType: EventType.OPEN_ASK_FOR_JOB_INTERVIEW, payload: application});
  }

  public handleOpenJobInterview(application: Application): void {
    this.eventService.dispatchEvent({eventType: EventType.OPEN_JOB_INTERVIEW, payload: application});
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

  public ngOnDestroy(): void {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
    if (this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }
}
