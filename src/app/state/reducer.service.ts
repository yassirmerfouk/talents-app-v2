import {inject, Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
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
import {Client, ClientRequest} from "../models/client.model";
import {ClientService} from "../services/client.service";
import {User} from "../models/user.model";
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class Reducer {

  private store: Store = inject(Store);

  private dispatcherSubject: Subject<ActionEvent> = new Subject<ActionEvent>();
  public dispatcher$: Observable<ActionEvent> = this.dispatcherSubject.asObservable();

  private authService: AuthService = inject(AuthService);
  private authStateService: AuthStateService = inject(AuthStateService);
  private jobService: JobService = inject(JobService);
  private clientService: ClientService = inject(ClientService);
  private userService: UserService = inject(UserService);

  private router: Router = inject(Router);

  public dispatch($event: ActionEvent): void {
    this.dispatcherSubject.next($event);
  }

  public constructor() {
    this.dispatcher$.subscribe(
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
          case EventType.SELECT_TALENT :
            this.selectTalentForJob($event.payload);
            break;
          case EventType.APPROVE_TALENT :
            this.approveTalentForJob($event.payload);
            break;
          case EventType.SEARCH_JOBS :
            this.searchJobs($event.payload);
            break;
          case EventType.OPEN_JOB :
            this.openJob($event.payload);
            break;
          case EventType.CLOSE_JOB :
            this.closeJob();
            break;
          case EventType.APPLY_TO_JOB :
            this.applyToJob($event.payload);
            break;
          case EventType.GET_CLIENTS :
            this.getClients($event.payload);
            break;
          case EventType.VERIFY_USER :
            this.verifyUser($event.payload);
            break;
          case EventType.BAN_USER :
            this.banUser($event.payload);
            break;
          case EventType.PERMIT_USER :
            this.permitUser($event.payload);
            break;
          case EventType.GET_CLIENT :
            this.getClient($event.payload);
            break;
          case EventType.GET_CLIENT_PROFILE :
            this.getClientProfile();
            break;
          case EventType.UPDATE_CLIENT_PROFILE :
            this.updateClientProfile($event.payload);
            break;
          case EventType.UPDATE_IMAGE :
            this.updateImage($event.payload);
            break;
          case EventType.ASK_VERIFICATION :
            this.askForVerification($event.payload);
            break;
          case EventType.GET_MY_JOBS :
            this.getMyJobs($event.payload);
            break;
          case EventType.OPEN_ADD_JOB :
            this.openAddJob();
            break;
          case EventType.CLOSE_ADD_JOB :
            this.closeAddJob();
            break;
          case EventType.OPEN_EDIT_JOB :
            this.openEditJob($event.payload);
            break;
          case EventType.CLOSE_EDIT_JOB :
            this.closeEditJob();
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
        });
      }
    });
  }

  public getSelectedJobApplications(id: number): void {
    this.jobService.getSelectedJobApplication(id).subscribe({
      next: (selectedApplications: Array<Application>) => {
        let jobsState = {...this.store.state.jobsState, ...{selectedApplications: selectedApplications}}
        this.store.setState({
          jobsState: jobsState
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.store.setState({
          jobsState: {error: error.error.message}
        });
      }
    });
  }

  public selectTalentForJob(application: Application): void {
    this.jobService.selectTalentForJob(application.jobId, application.talent.id).subscribe({
      next: () => {
        application.selected = !application.selected;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.store.setState({
          jobsState: {error: error.error.message}
        });
      }
    });
  }

  public approveTalentForJob(application: Application): void {
    this.jobService.approveTalent(application.jobId, application.talent.id).subscribe({
      next: () => {
        application.approved = !application.approved
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.store.setState({
          jobsState: {error: error.error.message}
        });
      }
    });
  }

  public searchJobs(payload: any): void {
    this.jobService.searchJobs(payload.keyword, payload.page, payload.size).subscribe({
      next: (jobsPage: Page<Job>) => {
        this.store.setState({
          jobsState: {jobsPage: jobsPage}
        });
      }
    });
  }

  public openJob(job: Job): void {
    let jobsState = {...this.store.state.jobsState, ...{openJob: true, selectedJob: job}};
    this.store.setState({jobsState: jobsState});
  }

  public closeJob(): void {
    let jobsState = {...this.store.state.jobsState, ...{openJob: false}};
    this.store.setState({jobsState: jobsState});
  }

  public applyToJob(id: number): void {
    this.jobService.applyToJob(id).subscribe({
      next: () => {
        let selectedJob: Job = this.store.state.jobsState.selectedJob;
        selectedJob.applied = true;
        let jobsState = {...this.store.state.jobsState, ...{openJob: true, selectedJob: selectedJob}};
        this.store.setState({jobsState: jobsState});
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public getClients(payload: any): void {
    this.clientService.getClients(payload.status, payload.page, payload.size).subscribe({
      next: (clientsPage: Page<Client>) => {
        this.store.setState({clientsState: {clientsPage: clientsPage}});
      }
    });
  }

  public verifyUser(user: User): void {
    this.userService.verifyUser(user.id).subscribe({
      next: () => {
        user.status = 'VERIFIED'
      },
      error: (error: HttpErrorResponse) => console.log(error)
    });
  }

  public banUser(user: User): void {
    this.userService.banUser(user.id).subscribe({
      next: () => {
        user.status = 'BANNED';
      },
      error: (error: HttpErrorResponse) => console.log(error)
    });
  }

  public permitUser(user: User): void {
    this.userService.banUser(user.id).subscribe({
      next: () => {
        user.status = 'NOT_VERIFIED';
      },
      error: (error: HttpErrorResponse) => console.log(error)
    });
  }

  public getClient(id: number): void {
    this.clientService.getClient(id).subscribe({
      next: (client: Client) => {
        this.store.setState({clientState: {client: client}});
      },
      error: (error: HttpErrorResponse) => console.log(error)
    });
  }

  public getClientProfile(): void {
    this.clientService.profile().subscribe({
      next: (client: Client) => {
        this.store.setState({clientState: {client: client}});
      },
      error: (error: HttpErrorResponse) => console.log(error)
    });
  }

  public updateClientProfile(clientRequest: ClientRequest): void {
    this.clientService.updateProfile(clientRequest).subscribe({
      next: (client: Client) => {
        this.store.setState({clientState: {client: client}});
      },
      error: (error: HttpErrorResponse) => console.log(error)
    });
  }

  private updateImage(image: any): void {
    this.userService.updateImage(image).subscribe({
      next: (image: any) => {
        let clientState = {...this.store.state.clientState, ...{image: image}}
        this.store.setState({clientState: clientState});
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  private askForVerification(user: User): void {
    this.userService.askForVerification().subscribe({
      next: () => {
        user.status = 'WAITING';
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public getMyJobs(payload: any): void {
    this.jobService.getMyJobs(payload.page, payload.size).subscribe({
      next: (jobsPage: Page<Job>) => {
        this.store.setState({
          jobsState: {jobsPage: jobsPage, displayJobs: true}
        });
      },
      error: (error: HttpErrorResponse) => console.log(error)
    });
  }

  public openAddJob(): void {
    let jobsState = {...this.store.state.jobsState, ...{openAddJob: true, openEditJob: false, displayJobs: true}};
    this.store.setState({
      jobsState: jobsState
    });
  }

  public closeAddJob(): void {
    let jobsState = {...this.store.state.jobsState, ...{openAddJob: false, openEditJob: false, displayJobs: true}};
    this.store.setState({
      jobsState: jobsState
    });
  }

  public openEditJob(job: Job): void {
    let jobsState = {
      ...this.store.state.jobsState, ...{
        openAddJob: false,
        openEditJob: true,
        displayJobs: false,
        selectedJob: job
      }
    };
    this.store.setState({
      jobsState: jobsState
    });
  }

  public closeEditJob(): void {
    let jobsState = {
      ...this.store.state.jobsState, ...{
        openAddJob: false,
        openEditJob: false,
        displayJobs: true,
      }
    };
    this.store.setState({
      jobsState: jobsState
    });
  }

}
