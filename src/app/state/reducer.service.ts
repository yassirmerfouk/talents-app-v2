import {inject, Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {ActionEvent} from "./action-event.event";
import {AuthenticationRequest, AuthenticationResponse} from "../models/authentication.model";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {AuthStateService} from "../services/auth.state.service";
import {Router} from "@angular/router";
import {EventType} from "./event-type.enum";
import {Store} from "./store.service";
import {ClientRegistration, TalentRegistration} from "../models/registration.model";
import {Page} from "../models/page.model";
import {Job} from "../models/job.model";
import {JobService} from "../services/job.service";
import {Application} from "../models/application.model";

@Injectable({
  providedIn: 'root'
})
export class Reducer {

  private store: Store = inject(Store);

  private dispatcher: Subject<ActionEvent> = new Subject<ActionEvent>();

  private authService: AuthService = inject(AuthService);
  private authStateService: AuthStateService = inject(AuthStateService);
  private jobService: JobService = inject(JobService);

  private router: Router = inject(Router);

  public dispatch($event: ActionEvent): void {
    this.dispatcher.next($event);
  }

  public constructor() {
    this.dispatcher.subscribe(
      ($event: ActionEvent) => {
        switch ($event.eventType) {
          case EventType.LOGIN :
            this.login($event.payload);
            break;
          case EventType.REGISTER_TALENT :
            this.registerTalent($event.payload);
            break;
          case EventType.REGISTER_CLIENT :
            this.registerClient($event.payload);
            break;
          case EventType.RECOVER_PASSWORD :
            this.recoverPassword($event.payload);
            break;
          case EventType.RESET_PASSWORD :
            this.resetPassword($event.payload);
            break;
          case EventType.CONFIRM_ACCOUNT :
            this.confirmAccount($event.payload);
            break;
          case EventType.GET_JOBS :
            this.getJobs($event.payload);
            break;
          case EventType.GET_JOB :
            this.getJob($event.payload);
            break;
          case EventType.GET_JOB_APPLICATIONS :
            this.getJobApplications($event.payload);
            break;
          case EventType.GET_JOB_SELECTED_APPLICATIONS :
            this.getSelectedJobApplications($event.payload);
            break;
        }
      }
    );
  }


  public login(authenticationRequest: AuthenticationRequest): void {
    this.authService.login(authenticationRequest).subscribe({
      next: (response: AuthenticationResponse) => {
        this.authStateService.loadUser(response.accessToken);
        this.authStateService.storeTokenInLocalStorage(response.accessToken);
        if (this.authStateService.hasAuthority('TALENT'))
          this.router.navigateByUrl('/jobs');
        if (this.authStateService.hasAuthority('CLIENT'))
          this.router.navigateByUrl('/jobs');
        if (this.authStateService.hasAuthority('ADMIN'))
          this.router.navigateByUrl('/admin/jobs');
      },
      error: (error: HttpErrorResponse) => {
        this.store.setState({
          loginState: {
            error: error.error.message,
            errors: error.error.errors
          }
        });
      }
    });
  }

  public registerTalent(talentRegistration: TalentRegistration): void {
    this.authService.registerTalent(talentRegistration).subscribe({
      next: (response: number) => {
        console.log(response)
        this.store.setState({
          registerTalentState: {
            successMessage: "Your registration was completed successfully."
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        this.store.setState({
          registerTalentState: {
            error: error.error.message,
            errors: error.error.errors
          }
        });
      }
    });
  }

  public registerClient(clientRegistration: ClientRegistration): void {
    this.authService.registerClient(clientRegistration).subscribe({
      next: (response: number) => {
        console.log(response)
        this.store.setState({
          registerTalentState: {
            successMessage: "Your registration was completed successfully."
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        this.store.setState({
          registerClientState: {
            error: error.error.message,
            errors: error.error.errors
          }
        });
      }
    });
  }

  public recoverPassword(email: string): void {
    this.authService.recoverPassword(email).subscribe({
      next: () => {
        this.store.setState({
          recoverState: {
            successMessage: "Please check your inbox for instructions to reset your password."
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        this.store.setState({
          recoverState: {
            error: error.error.message,
            errors: error.error.errors
          }
        });
      }
    });
  }

  public resetPassword(resetPasswordRequest: any): void {
    this.authService.resetPassword(resetPasswordRequest).subscribe({
      next: () => {
        this.store.setState({
          resetPasswordState: {
            successMessage: "Your password has been reset successfully. You can now log in with your new password."
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        this.store.setState({
          resetPasswordState: {
            error: error.error.message,
            errors: error.error.errors
          }
        });
      }
    });
  }

  public confirmAccount(token: string): void {
    this.authService.confirmAccount(token).subscribe({
      next: () => {
        this.store.setState({
          accountConfirmationState: {
            successMessage: "Your account has been successfully confirmed."
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        this.store.setState({
          accountConfirmationState: {
            error: error.error.message,
            errors: error.error.errors
          }
        });
      }
    });
  }

  public getJobs(payload: any): void {
    this.jobService.getJobs(payload.status, payload.page, payload.size).subscribe({
      next: (jobsPage: Page<Job>) => {
        this.store.setState({
          jobsState: {jobsPage: jobsPage}
        })
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        this.store.setState({
          jobsState: {error: error.error.message}
        })
      }
    });
  }

  public getJob(id: number): void {
    this.jobService.getJob(id).subscribe({
      next: (job: Job) => {
        this.store.setState({
          jobsState: {job: job}
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        this.store.setState({
          jobsState: {error: error.error.message}
        });
      }
    });
  }

  public getJobApplications(payload: any): void {
    this.jobService.getJobApplications(payload.id, payload.page, payload.size).subscribe({
      next: (applicationsPage: Page<Application>) => {
        let jobsState = {...this.store.state.jobsState, ...{applicationsPage: applicationsPage}}
        this.store.setState({
          jobsState: jobsState
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        this.store.setState({
          jobsState: {error: error.error.message}
        })
      }
    });
  }

  public getSelectedJobApplications(id: number): void {
    this.jobService.getSelectedJobApplication(id).subscribe({
      next: (selectedApplications: Array<Application>) => {
        let jobsState = {...this.store.state.jobsState, ...{selectedApplications : selectedApplications}}
        this.store.setState({
          jobsState: jobsState
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }
}
