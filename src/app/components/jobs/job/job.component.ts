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
  private authStateService: AuthStateService = inject(AuthStateService);


  private id !: number;
  public job !: Job;

  public applicationsPage !: Page<Application>;
  private page: number = 0;
  private size: number = 10;

  public selectedApplications !: Array<Application>;

  public ngOnInit() {

  this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {
        this.job = state.jobsState.job;
        this.applicationsPage = state.jobsState.applicationsPage;
        this.selectedApplications = state.jobsState.selectedApplications;
      }
    );

    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        if (this.id){
          this.getJob();
          this.getJobApplications();
          this.getSelectedJobApplications();
        }
      }
    );

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
    this.eventService.dispatchEvent({eventType : EventType.SELECT_TALENT, payload : application});
  }

  public handleOnChangeApprove(application: Application): void {
    this.eventService.dispatchEvent({eventType : EventType.APPROVE_TALENT, payload : application});
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

  public ngOnDestroy() : void {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }
}
