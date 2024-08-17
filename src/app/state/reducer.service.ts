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
import {Job, JobRequest} from "../models/job.model";
import {JobService} from "../services/job.service";
import {Application} from "../models/application.model";
import {Client, ClientRequest} from "../models/client.model";
import {ClientService} from "../services/client.service";
import {User} from "../models/user.model";
import {UserService} from "../services/user.service";
import {Talent, TalentRequest} from "../models/talent.model";
import {TalentService} from "../services/talent.service";
import {Experience} from "../models/experience.model";
import {ExperienceService} from "../services/experience.service";
import {Education} from "../models/education.model";
import {EducationService} from "../services/education.service";
import {Project} from "../models/project.model";
import {ProjectService} from "../services/project.service";
import {Language} from "../models/language.model";
import {LanguageService} from "../services/language.service";
import {Certification} from "../models/certification.model";
import {CertificationService} from "../services/certification.service";
import {Meet} from "../models/meet.model";
import {MeetService} from "../services/meet.service";
import {JobInterview} from "../models/job.interview.model";
import {JobInterviewService} from "../services/job.interview.service";
import {Helper} from "../helper/helper";
import {SelectionService} from "../services/selection.service";
import {ItemResponse, Selection, SelectionRequest} from "../models/selection.model";

@Injectable({
  providedIn: 'root'
})
export class Reducer {

  private store: Store = inject(Store);

  public dispatcherSubject: Subject<ActionEvent> = new Subject<ActionEvent>();
  public dispatcher$: Observable<ActionEvent> = this.dispatcherSubject.asObservable();

  private authService: AuthService = inject(AuthService);
  private authStateService: AuthStateService = inject(AuthStateService);
  private jobService: JobService = inject(JobService);
  private clientService: ClientService = inject(ClientService);
  private userService: UserService = inject(UserService);
  private talentService: TalentService = inject(TalentService);
  private experienceService: ExperienceService = inject(ExperienceService);
  private educationService: EducationService = inject(EducationService);
  private projectService: ProjectService = inject(ProjectService);
  private languageService: LanguageService = inject(LanguageService);
  private certificationService: CertificationService = inject(CertificationService);
  private meetService: MeetService = inject(MeetService);
  private jobInterviewService: JobInterviewService = inject(JobInterviewService);
  private selectionService: SelectionService = inject(SelectionService);

  private router: Router = inject(Router);

  private helper: Helper = inject(Helper);

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
            this.selectTalent($event.payload);
            break;
          case EventType.APPROVE_TALENT :
            this.approveTalent($event.payload);
            break;
          case EventType.REFUSE_TALENT :
            this.refuseTalent($event.payload);
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
          case EventType.ADD_JOB :
            this.addJob($event.payload);
            break;
          case EventType.UPDATE_JOB :
            this.updateJob($event.payload);
            break;
          case EventType.DELETE_JOB :
            this.deleteJob($event.payload);
            break;
          case EventType.GET_TALENTS :
            this.getTalents($event.payload);
            break;
          case EventType.GET_TALENT :
            this.getTalent($event.payload);
            break;
          case EventType.GET_TALENT_PROFILE :
            this.getTalentProfile();
            break;
          case EventType.UPDATE_TALENT_PROFILE :
            this.updateTalentProfile($event.payload);
            break;
          case EventType.OPEN_ADD_EXPERIENCE :
            this.openAddExperience();
            break;
          case EventType.CLOSE_ADD_EXPERIENCE :
            this.closeAddExperience();
            break;
          case EventType.ADD_EXPERIENCE :
            this.addExperience($event.payload);
            break;
          case EventType.OPEN_EDIT_EXPERIENCE :
            this.openEditExperience($event.payload);
            break;
          case EventType.CLOSE_EDIT_EXPERIENCE :
            this.closeEditExperience();
            break;
          case EventType.UPDATE_EXPERIENCE :
            this.updateExperience($event.payload);
            break;
          case EventType.DELETE_EXPERIENCE :
            this.deleteExperience($event.payload);
            break;
          case EventType.ADD_EDUCATION :
            this.addEducation($event.payload);
            break;
          case EventType.UPDATE_EDUCATION :
            this.updateEducation($event.payload);
            break;
          case EventType.DELETE_EDUCATION :
            this.deleteEducation($event.payload);
            break;
          case EventType.OPEN_ADD_EDUCATION :
            this.openAddEducation();
            break;
          case EventType.CLOSE_ADD_EDUCATION:
            this.closeAddEducation();
            break;
          case EventType.OPEN_EDIT_EDUCATION:
            this.openEditEducation($event.payload);
            break;
          case EventType.CLOSE_EDIT_EDUCATION :
            this.closeEditEducation();
            break;
          case EventType.ADD_PROJECT :
            this.addProject($event.payload);
            break;
          case EventType.UPDATE_PROJECT :
            this.updateProject($event.payload);
            break;
          case EventType.DELETE_PROJECT :
            this.deleteProject($event.payload);
            break;
          case EventType.OPEN_ADD_PROJECT:
            this.openAddProject();
            break;
          case EventType.CLOSE_ADD_PROJECT:
            this.closeAddProject();
            break;
          case EventType.OPEN_EDIT_PROJECT:
            this.openEditProject($event.payload);
            break;
          case EventType.CLOSE_EDIT_PROJECT :
            this.closeEditProject();
            break;
          case EventType.ADD_LANGUAGE :
            this.addLanguage($event.payload);
            break;
          case EventType.UPDATE_LANGUAGE :
            this.updateLanguage($event.payload);
            break;
          case EventType.DELETE_LANGUAGE :
            this.deleteLanguage($event.payload);
            break;
          case EventType.OPEN_ADD_LANGUAGE :
            this.openAddLanguage();
            break;
          case EventType.CLOSE_ADD_LANGUAGE :
            this.closeAddLanguage();
            break;
          case EventType.OPEN_EDIT_LANGUAGE :
            this.openEditLanguage($event.payload);
            break;
          case EventType.CLOSE_EDIT_LANGUAGE :
            this.closeEditLanguage();
            break;

          case EventType.ADD_CERTIFICATION :
            this.addCertification($event.payload);
            break;
          case EventType.UPDATE_CERTIFICATION :
            this.updateCertification($event.payload);
            break;
          case EventType.DELETE_CERTIFICATION :
            this.deleteCertification($event.payload);
            break;
          case EventType.OPEN_ADD_CERTIFICATION :
            this.openAddCertification();
            break;
          case EventType.CLOSE_ADD_CERTIFICATION :
            this.closeAddCertification();
            break;
          case EventType.OPEN_EDIT_CERTIFICATION :
            this.openEditCertification($event.payload);
            break;
          case EventType.CLOSE_EDIT_CERTIFICATION :
            this.closeEditCertification();
            break;
          case EventType.OPEN_EDIT_SKILLS :
            this.openEditSkills();
            break;
          case EventType.CLOSE_EDIT_SKILLS :
            this.closeEditSkills();
            break;
          case EventType.UPDATE_SKILLS :
            this.updateSkills($event.payload);
            break;
          case EventType.OPEN_ADD_MEET :
            this.openProgramMeet($event.payload);
            break;
          case EventType.CLOSE_ADD_MEET :
            this.closeProgramMeet();
            break;
          case EventType.PROGRAM_MEET :
            this.programMeet($event.payload);
            break;
          case EventType.GET_MEETS :
            this.getMeets($event.payload);
            break;
          case EventType.ACCEPT_MEET :
            this.acceptMeet($event.payload);
            break;
          case EventType.REFUSE_MEET :
            this.refuseMeet($event.payload);
            break;
          case EventType.CLOSE_MEET :
            this.closeMeet($event.payload);
            break;
          case EventType.OPEN_SHOW_MEET :
            this.openShowMeet($event.payload);
            break;
          case EventType.CLOSE_SHOW_MEET :
            this.closeShowMeet();
            break;
          case EventType.OPEN_GET_APPLICATION_STATS:
            this.openGetStats($event.payload);
            break;
          case EventType.CLOSE_GET_APPLICATION_STATS :
            this.closeGetStats();
            break;

          case EventType.ASK_TO_START_SELECTION:
            this.askToStartSelection($event.payload);
            break;
          case EventType.START_SELECTION :
            this.startSelection($event.payload);
            break;
          case EventType.START_APPROVING :
            this.startApproving($event.payload);
            break;

          case EventType.OPEN_UPDATE_TALENT_PROFILE :
            this.openUpdateTalentProfile();
            break;
          case EventType.CLOSE_UPDATE_TALENT_PROFILE :
            this.closeUpdateTalentProfile();
            break;
          case EventType.OPEN_UPDATE_CLIENT_PROFILE :
            this.openUpdateClientProfile();
            break;
          case EventType.CLOSE_UPDATE_CLIENT_PROFILE :
            this.closeUpdateClientProfile();
            break;
          case EventType.CLOSE_JOB_PROCESS :
            this.closeJobProcess($event.payload);
            break;

          case EventType.OPEN_ASK_FOR_JOB_INTERVIEW :
            this.openAskForJobInterview($event.payload);
            break;
          case EventType.CLOSE_ASK_FOR_JOB_INTERVIEW :
            this.closeAskForJobInterview();
            break;
          case EventType.ADD_JOB_INTERVIEW :
            this.addJobInterview($event.payload.application, $event.payload.jobInterview);
            break;
          case EventType.OPEN_JOB_INTERVIEW:
            this.openJobInterview($event.payload);
            break;
          case EventType.CLOSE_JOB_INTERVIEW :
            this.closeJobInterview();
            break;

          case EventType.OPEN_ADD_CLIENT_MEET :
            this.openAddClientMeet($event.payload.job, $event.payload.application, $event.payload.date);
            break;
          case EventType.CLOSE_ADD_CLIENT_MEET :
            this.closeAddClientMeet();
            break;
          case EventType.PROGRAM_CLIENT_MEET :
            this.programClientMeet($event.payload);
            break;

          case EventType.GET_MY_SELECTIONS :
            this.getMySelections($event.payload);
            break;
          case EventType.GET_SELECTIONS :
            this.getSelections($event.payload);
            break;
          case EventType.GET_SELECTION :
            this.getSelection($event.payload);
            break;
          case EventType.ADD_SELECTION :
            this.addSelection($event.payload);
            break;
          case EventType.DELETE_SELECTION :
            this.deleteSelection($event.payload);
            break;

          case EventType.OPEN_ADD_SELECTION :
            this.openAddSelection();
            break;
          case EventType.CLOSE_ADD_SELECTION :
            this.closeAddSelection();
            break;

          case EventType.SELECT_TALENT_IN_LOCAL :
            this.selectTalentInLocal($event.payload);
            break;
          case EventType.UNSELECT_TALENT_IN_LOCAL :
            this.unselectTalentInLocal($event.payload);
            break;
          case EventType.GET_TALENTS_IN_LOCAL :
            this.getTalentsInLocal();
            break;
          case EventType.LOAD_LOCAL_TALENTS :
            this.loadLocalTalents();
            break;

          case EventType.OPEN_SELECTION_REPORT:
            this.openSelectionReport($event.payload);
            break;
          case EventType.CLOSE_SELECTION_REPORT:
            this.closeSelectionReport();
            break;
          case EventType.UPDATE_SELECTION_ITEM :
            this.updateSelectionItem($event.payload);
            break;

          case EventType.ACCEPT_SELECTION:
            this.acceptSelection($event.payload);
            break;
          case EventType.REFUSE_SELECTION:
            this.refuseSelection($event.payload);
            break;
          case EventType.START_SELECTION_CHOOSING:
            this.startSelectionChoosing($event.payload);
            break
          case EventType.CLOSE_SELECTION:
            this.closeSelection($event.payload);
            break;
          case EventType.SELECT_TALENT_FOR_SELECTION:
            this.selectTalentForSelection($event.payload);
            break;
        }
      }
    );
  }


  public login(authenticationRequest: AuthenticationRequest): void {
    this.authService.login(authenticationRequest).subscribe({
      next: (response: AuthenticationResponse) => {
        if (this.authStateService.loadUser(response.accessToken)) {
          this.authStateService.storeTokenInLocalStorage(response.accessToken);
          this.dispatcherSubject.next({eventType: EventType.CONNECT_TO_NOTIFICATION});
          if (this.authStateService.hasAuthority('TALENT'))
            this.router.navigateByUrl('/jobs');
          if (this.authStateService.hasAuthority('CLIENT'))
            this.router.navigateByUrl('/jobs');
          if (this.authStateService.hasAuthority('ADMIN'))
            this.router.navigateByUrl('/admin/jobs');
        }
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public registerTalent(talentRegistration: TalentRegistration): void {
    this.authService.registerTalent(talentRegistration).subscribe({
      next: (response: number) => {
        this.helper.setSuccessMessageInState("Your registration was completed successfully, please check your email for the confirmation.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public registerClient(clientRegistration: ClientRegistration): void {
    this.authService.registerClient(clientRegistration).subscribe({
      next: (response: number) => {
        this.helper.setSuccessMessageInState("Your registration was completed successfully, please check your email for the confirmation.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public recoverPassword(email: string): void {
    this.authService.recoverPassword(email).subscribe({
      next: () => {
        this.helper.setSuccessMessageInState("Please check your inbox for instructions to reset your password.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public resetPassword(resetPasswordRequest: any): void {
    this.authService.resetPassword(resetPasswordRequest).subscribe({
      next: () => {
        this.helper.setSuccessMessageInState("Your password has been reset successfully. You can now log in with your new password.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public confirmAccount(token: string): void {
    this.authService.confirmAccount(token).subscribe({
      next: () => {
        this.helper.setSuccessMessageInState("Your account has been successfully confirmed.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
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
        this.helper.setErrorInState(error);
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
        this.helper.setErrorInState(error);
      }
    });
  }

  public getJobApplications(payload: any): void {
    this.jobService.getJobApplications(payload.id, payload.status, payload.page, payload.size).subscribe({
      next: (applicationsPage: Page<Application>) => {
        let jobsState = {...this.store.state.jobsState, ...{applicationsPage: applicationsPage}}
        this.store.setState({
          jobsState: jobsState
        });
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
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
        this.helper.setErrorInState(error);
      }
    });
  }

  public selectTalent(application: Application): void {
    this.jobService.selectTalent(application.jobId, application.talent.id).subscribe({
      next: () => {
        application.selected = !application.selected;
        if (application.selected)
          this.helper.setSuccessMessageInState("Talent has been selected for the job with success.");
        else
          this.helper.setSuccessMessageInState("Talent has been unselected from the job.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public approveTalent(application: Application): void {
    this.jobService.approveTalent(application.jobId, application.talent.id).subscribe({
      next: () => {
        application.approved = true;
        this.helper.setSuccessMessageInState("Talent has been approved for the job.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public refuseTalent(application: Application): void {
    this.jobService.refuseTalent(application.jobId, application.talent.id).subscribe({
      next: () => {
        application.refused = true;
        this.helper.setSuccessMessageInState("Talent has been refused for the job.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public searchJobs(payload: any): void {
    this.jobService.searchJobs(payload.keyword, payload.page, payload.size).subscribe({
      next: (jobsPage: Page<Job>) => {
        this.store.setState({
          jobsState: {jobsPage: jobsPage}
        });
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
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
        this.helper.setSuccessMessageInState("Your application has been successfully submitted. Thank you for applying.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public getClients(payload: any): void {
    this.clientService.getClients(payload.status, payload.page, payload.size).subscribe({
      next: (clientsPage: Page<Client>) => {
        this.store.setState({clientsState: {clientsPage: clientsPage}});
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public verifyUser(user: User): void {
    this.userService.verifyUser(user.id).subscribe({
      next: () => {
        user.status = 'VERIFIED';
        this.helper.setSuccessMessageInState("User has been verified with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public banUser(user: User): void {
    this.userService.banUser(user.id).subscribe({
      next: () => {
        user.status = 'BANNED';
        this.helper.setSuccessMessageInState("User has been baned with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public permitUser(user: User): void {
    this.userService.banUser(user.id).subscribe({
      next: () => {
        user.status = 'NOT_VERIFIED';
        this.helper.setSuccessMessageInState("User has been permitted with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public getClient(id: number): void {
    this.clientService.getClient(id).subscribe({
      next: (client: Client) => {
        this.store.setState({clientState: {client: client}});
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public getClientProfile(): void {
    this.clientService.profile().subscribe({
      next: (client: Client) => {
        this.store.setState({clientState: {client: client}});
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public updateClientProfile(clientRequest: ClientRequest): void {
    this.clientService.updateProfile(clientRequest).subscribe({
      next: (client: Client) => {
        let clientState = this.store.state.clientState;
        clientState = {...clientState, ...{client: client}};
        this.store.setState({clientState: clientState});
        this.dispatcherSubject.next({eventType: EventType.CLOSE_UPDATE_CLIENT_PROFILE});
        this.helper.setSuccessMessageInState("Your profile infos has been updated with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  private updateImage(image: any): void {
    this.userService.updateImage(image).subscribe({
      next: (image: any) => {
        this.store.setState({profileImage: image});
        this.helper.setSuccessMessageInState("Your profile image has been updated with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  private askForVerification(user: User): void {
    this.userService.askForVerification().subscribe({
      next: () => {
        user.status = 'WAITING';
        this.helper.setSuccessMessageInState("Your request for verification had been sent to admins.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
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
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public openAddJob(): void {
    let jobsState = {...this.store.state.jobsState, ...{openAddJob: true, openEditJob: false}};
    this.store.setState({
      jobsState: jobsState
    });
  }

  public closeAddJob(): void {
    let jobsState = {...this.store.state.jobsState, ...{openAddJob: false, openEditJob: false}};
    this.store.setState({
      jobsState: jobsState
    });
  }

  public openEditJob(job: Job): void {
    let jobsState = {
      ...this.store.state.jobsState, ...{
        openAddJob: false,
        openEditJob: true,
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
        openEditJob: false
      }
    };
    this.store.setState({
      jobsState: jobsState
    });
  }

  public addJob(jobRequest: JobRequest): void {
    this.jobService.addJob(jobRequest).subscribe({
      next: (job: Job) => {
        let jobsPage = this.store.state.jobsState.jobsPage;
        jobsPage.content.unshift(job);
        let jobsState = {...this.store.state.jobsState, ...{jobsPage: jobsPage}};
        this.store.setState(jobsState);
        this.dispatcherSubject.next({eventType: EventType.CLOSE_ADD_JOB});
        this.helper.setSuccessMessageInState("Your job has been added with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    })
  }

  public updateJob(jobRequest: JobRequest): void {
    this.jobService.updateJob(jobRequest).subscribe({
      next: (job: Job) => {
        let jobsPage = this.store.state.jobsState.jobsPage;
        jobsPage.content = jobsPage.content.map((jb: Job) => {
          if (jb.id == jobRequest.id) jb = job;
          return jb;
        });
        let jobsState = {...this.store.state.jobsState, ...{jobsPage: jobsPage}};
        this.store.setState(jobsState);
        this.dispatcherSubject.next({eventType: EventType.CLOSE_EDIT_JOB});
        this.helper.setSuccessMessageInState("Your job has been updated with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public deleteJob(id: number): void {
    this.jobService.deleteJob(id).subscribe({
      next: () => {
        let jobsPage = this.store.state.jobsState.jobsPage;
        jobsPage.content = jobsPage.content.filter((job: Job) => job.id != id);
        let jobsState = {...this.store.state.jobsState, ...{jobsPage: jobsPage}};
        this.store.setState(jobsState);
        this.helper.setSuccessMessageInState("Your job has been deleted with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public getTalents(payload: any): void {
    this.talentService.getTalents(payload.status, payload.page, payload.size).subscribe({
      next: (talentsPage: Page<Talent>) => {
        this.store.setState({talentsState: {talentsPage: talentsPage}});
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public getTalent(id: number): void {
    this.talentService.getTalent(id).subscribe({
      next: (talent: Talent) => {
        this.reverseTalent(talent);
        this.store.setState({talentState: {talent: talent}});
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }


  private reverseTalent(talent: Talent): void {
    talent.experiences = talent.experiences.reverse();
    talent.educations = talent.educations.reverse();
    talent.projects = talent.projects.reverse();
  }

  public getTalentProfile(): void {
    this.talentService.profile().subscribe({
      next: (talent: Talent) => {
        this.reverseTalent(talent);
        this.store.setState({talentState: {talent: talent}});
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  private updateTalentProfile(talentRequest: TalentRequest): void {
    this.talentService.updateProfile(talentRequest).subscribe({
      next: (talent: any) => {
        this.reverseTalent(talent);
        let talentState = this.store.state.talentState;
        talentState = {...talentState, ...{talent: talent}}
        this.store.setState({talentState: talentState});
        this.dispatcherSubject.next({eventType: EventType.CLOSE_UPDATE_TALENT_PROFILE});
        this.helper.setSuccessMessageInState("Your profile infos are updated with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  private openAddExperience(): void {
    this.store.setState({experiencesState: {openAddExperience: true, openEditExperience: false}});
  }

  private closeAddExperience(): void {
    this.store.setState({experiencesState: {openAddExperience: false, openEditExperience: false}});
  }

  private addExperience(experience: Experience): void {
    this.experienceService.addExperience(experience).subscribe({
      next: (experience: Experience) => {
        let talent = this.store.state.talentState.talent;
        talent.experiences.unshift(experience);
        let talentState = {...this.store.state.talentState, ...{talent: talent}};
        this.store.setState(talentState);
        this.dispatcherSubject.next({eventType: EventType.CLOSE_ADD_EXPERIENCE});
        this.helper.setSuccessMessageInState("Your experience has been add with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  private openEditExperience(experience: Experience): void {
    this.store.setState({
      experiencesState: {
        openAddExperience: false,
        openEditExperience: true,
        selectedExperience: experience
      }
    });
  }

  private closeEditExperience(): void {
    this.store.setState({experiencesState: {openAddExperience: false, openEditExperience: false}});
  }

  private updateExperience(experience: Experience): void {
    this.experienceService.updateExperience(experience).subscribe({
      next: (experience: Experience) => {
        let talent = this.store.state.talentState.talent;
        talent.experiences = talent.experiences.map((exp: Experience) => {
          if (exp.id == experience.id) exp = experience;
          return exp;
        });
        let talentState = {...this.store.state.talentState, ...{talent: talent}};
        this.store.setState(talentState);
        this.dispatcherSubject.next({eventType: EventType.CLOSE_EDIT_EXPERIENCE});
        this.helper.setSuccessMessageInState("Your experience has been updated with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  private deleteExperience(id: number): void {
    this.experienceService.deleteExperience(id).subscribe({
      next: () => {
        let talent = this.store.state.talentState.talent;
        talent.experiences = talent.experiences.filter((experience: { id: number; }) => experience.id != id);
        let talentState = {...this.store.state.talentState, ...{talent: talent}};
        this.store.setState(talentState);
        this.helper.setSuccessMessageInState('Your experience has been deleted with success.');
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public addEducation(education: Education): void {
    this.educationService.addEducation(education).subscribe({
      next: (education: Education) => {
        let talent = this.store.state.talentState.talent;
        talent.educations.unshift(education);
        let talentState = {...this.store.state.talentState, ...{talent: talent}};
        this.store.setState(talentState);
        this.dispatcherSubject.next({eventType: EventType.CLOSE_ADD_EDUCATION});
        this.helper.setSuccessMessageInState("Your education has been added with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public updateEducation(education: Education): void {
    this.educationService.updateEducation(education).subscribe({
      next: (education: Education) => {
        let talent = this.store.state.talentState.talent;
        talent.educations = talent.educations.map((edu: Education) => {
          if (edu.id == education.id) edu = education;
          return edu;
        });
        let talentState = {...this.store.state.talentState, ...{talent: talent}};
        this.store.setState(talentState);
        this.dispatcherSubject.next({eventType: EventType.CLOSE_EDIT_EDUCATION});
        this.helper.setSuccessMessageInState("Your experience has been updated with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public deleteEducation(id: number): void {
    this.educationService.deleteEducation(id).subscribe({
      next: () => {
        let talent = this.store.state.talentState.talent;
        talent.educations = talent.educations.filter((education: Education) => education.id != id);
        let talentState = {...this.store.state.talentState, ...{talent: talent}};
        this.store.setState(talentState);
        this.helper.setSuccessMessageInState("Your experience has been deleted with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  private openAddEducation(): void {
    this.store.setState({educationsState: {openAddEducation: true, openEditEducation: false}});
  }

  private closeAddEducation(): void {
    this.store.setState({educationsState: {openAddEducation: false, openEditEducation: false}});
  }

  private openEditEducation(education: Education): void {
    this.store.setState({
      educationsState: {
        openAddEducation: false,
        openEditEducation: true,
        selectedEducation: education
      }
    });
  }

  private closeEditEducation(): void {
    this.store.setState({educationsState: {openAddEducation: false, openEditEducation: false}});
  }

  public addProject(project: Project): void {
    this.projectService.addProject(project).subscribe({
      next: (project: Project) => {
        let talent = this.store.state.talentState.talent;
        talent.projects.unshift(project);
        let talentState = {...this.store.state.talentState, ...{talent: talent}};
        this.store.setState(talentState);
        this.dispatcherSubject.next({eventType: EventType.CLOSE_ADD_PROJECT});
        this.helper.setSuccessMessageInState("Your project has been added with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public updateProject(project: Project): void {
    this.projectService.updateProject(project).subscribe({
      next: (project: Project) => {
        let talent = this.store.state.talentState.talent;
        talent.projects = talent.projects.map((pro: Project) => {
          if (pro.id == project.id) pro = project;
          return pro;
        });
        let talentState = {...this.store.state.talentState, ...{talent: talent}};
        this.store.setState(talentState);
        this.dispatcherSubject.next({eventType: EventType.CLOSE_EDIT_PROJECT});
        this.helper.setSuccessMessageInState("Your project has been updated with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public deleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe({
      next: () => {
        let talent = this.store.state.talentState.talent;
        talent.projects = talent.projects.filter((project: Project) => project.id != id);
        let talentState = {...this.store.state.talentState, ...{talent: talent}};
        this.store.setState(talentState);
        this.helper.setSuccessMessageInState("Your project has been deleted with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  private openAddProject(): void {
    this.store.setState({projectsState: {openAddProject: true, openEditProject: false}});
  }

  private closeAddProject(): void {
    this.store.setState({projectsState: {openAddProject: false, openEditProject: false}});
  }

  private openEditProject(project: Project): void {
    this.store.setState({
      projectsState: {
        openAddProject: false,
        openEditProject: true,
        selectedProject: project
      }
    });
  }

  private closeEditProject(): void {
    this.store.setState({projectsState: {openAddProject: false, openEditProject: false}});
  }

  public addLanguage(language: Language): void {
    this.languageService.addLanguage(language).subscribe({
      next: (language: Language) => {
        let talent = this.store.state.talentState.talent;
        talent.languages.push(language);
        let talentState = {...this.store.state.talentState, ...{talent: talent}};
        this.store.setState(talentState);
        this.dispatcherSubject.next({eventType: EventType.CLOSE_ADD_LANGUAGE});
        this.helper.setSuccessMessageInState("Your language has been added with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public updateLanguage(language: Language): void {
    this.languageService.updateLanguage(language).subscribe({
      next: (language: Language) => {
        let talent = this.store.state.talentState.talent;
        talent.languages = talent.languages.map((lang: Language) => {
          if (lang.id == language.id) lang = language;
          return lang;
        });
        let talentState = {...this.store.state.talentState, ...{talent: talent}};
        this.store.setState(talentState);
        this.dispatcherSubject.next({eventType: EventType.CLOSE_EDIT_LANGUAGE});
        this.helper.setSuccessMessageInState("Your language has been updated with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public deleteLanguage(id: number): void {
    this.languageService.deleteLanguage(id).subscribe({
      next: () => {
        let talent = this.store.state.talentState.talent;
        talent.languages = talent.languages.filter((language: Language) => language.id != id);
        let talentState = {...this.store.state.talentState, ...{talent: talent}};
        this.store.setState(talentState);
        this.helper.setSuccessMessageInState("Your experience has been deleted with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  private openAddLanguage(): void {
    this.store.setState({languagesState: {openAddLanguage: true, openEditLanguage: false}});
  }

  private closeAddLanguage(): void {
    this.store.setState({languagesState: {openAddLanguage: false, openEditLanguage: false}});
  }

  private openEditLanguage(language: Language): void {
    this.store.setState({
      languagesState: {
        openAddLanguage: false,
        openEditLanguage: true,
        selectedLanguage: language
      }
    });
  }

  private closeEditLanguage(): void {
    this.store.setState({languagesState: {openAddLanguage: false, openEditLanguage: false}});
  }

  public addCertification(certification: Certification): void {
    this.certificationService.addCertification(certification).subscribe({
      next: (certification: Certification) => {
        let talent = this.store.state.talentState.talent;
        talent.certifications.push(certification);
        let talentState = {...this.store.state.talentState, ...{talent: talent}};
        this.store.setState(talentState);
        this.dispatcherSubject.next({eventType: EventType.CLOSE_ADD_CERTIFICATION});
        this.helper.setSuccessMessageInState("Your certification has been added with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public updateCertification(certification: Certification): void {
    this.certificationService.updateCertification(certification).subscribe({
      next: (certification: Certification) => {
        let talent = this.store.state.talentState.talent;
        talent.certifications = talent.certifications.map((cert: Certification) => {
          if (cert.id == certification.id) cert = certification;
          return cert;
        });
        let talentState = {...this.store.state.talentState, ...{talent: talent}};
        this.store.setState(talentState);
        this.dispatcherSubject.next({eventType: EventType.CLOSE_EDIT_CERTIFICATION});
        this.helper.setSuccessMessageInState("Your certification has been updated with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public deleteCertification(id: number): void {
    this.certificationService.deleteCertification(id).subscribe({
      next: () => {
        let talent = this.store.state.talentState.talent;
        talent.certifications = talent.certifications.filter((certification: Certification) => certification.id != id)
        let talentState = {...this.store.state.talentState, ...{talent: talent}};
        this.store.setState(talentState);
        this.helper.setSuccessMessageInState("Your certification has been deleted with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  private openAddCertification(): void {
    this.store.setState({certificationsState: {openAddCertification: true, openEditCertification: false}});
  }

  private closeAddCertification(): void {
    this.store.setState({certificationsState: {openAddCertification: false, openEditCertification: false}});
  }

  private openEditCertification(certification: Certification): void {
    this.store.setState({
      certificationsState: {
        openAddCertification: false,
        openEditCertification: true,
        selectedCertification: certification
      }
    });
  }

  private closeEditCertification(): void {
    this.store.setState({certificationsState: {openAddCertification: false, openEditCertification: false}});
  }

  private askToStartSelection(job: Job): void {
    this.jobService.askToStartSelection(job.id).subscribe({
      next: () => {
        job.status = 'WAITING';
        this.helper.setSuccessMessageInState("Your request to start job selection has been sent with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  private startSelection(job: Job): void {
    this.jobService.startSelection(job.id).subscribe({
      next: () => {
        job.status = 'IN_SELECTION';
        this.helper.setSuccessMessageInState("Job is in selection state now.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  private startApproving(job: Job): void {
    this.jobService.startApproving(job.id).subscribe({
      next: () => {
        job.status = 'IN_APPROVING';
        this.helper.setSuccessMessageInState("Job is in approving state now.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }


  private openEditSkills(): void {
    this.store.setState({skillsState: {openEditSkills: true}});
  }

  private closeEditSkills(): void {
    this.store.setState({skillsState: {openEditSkills: false}});
  }

  private updateSkills(skills: Array<string>): void {
    this.talentService.updateSkills(skills).subscribe({
      next: (skills: Array<string>) => {
        let talent = this.store.state.talentState.talent;
        talent.skills = skills;
        let talentState = {...this.store.state.talentState, ...{talent: talent}};
        this.store.setState(talentState);
        this.dispatcherSubject.next({eventType: EventType.CLOSE_EDIT_SKILLS});
        this.helper.setSuccessMessageInState("Your skills has been updated with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public openProgramMeet(user: User): void {
    this.store.setState({meetState: {openProgramMeet: true, selectedUser: user}});
  }

  public closeProgramMeet(): void {
    this.store.setState({meetState: {openProgramMeet: false, selectedUser: null}});
  }

  public programMeet(meet: Meet): void {
    this.meetService.addMeet(meet).subscribe({
      next: (newMeet: Meet) => {
        if (meet.meetType == "ADMIN_INTERVIEW") {
          let jobsState = this.store.state.jobsState;
          jobsState.applicationsPage.content = jobsState.applicationsPage.content.map((application: Application) => {
            if (application.jobId == meet.jobId && application.talent.id == meet.receivers[0])
              application.hasAdminMeet = true;
            return application;
          });
          this.store.setState({jobsState: jobsState});
        }
        this.dispatcherSubject.next({eventType: EventType.CLOSE_ADD_MEET});
        this.helper.setSuccessMessageInState("The meet has been programmed with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public getMeets(payload: any): void {
    this.meetService.getMeets(payload.date, payload.page, payload.size).subscribe({
      next: (meetsPage: Page<Meet>) => {
        this.store.setState({meetsState: {meetsPage: meetsPage}});
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public acceptMeet(meet: Meet): void {
    this.meetService.acceptMeet(meet.id).subscribe({
      next: () => {
        meet.status = 'ACCEPTED';
        this.helper.setSuccessMessageInState("Your meet has been accepted with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public refuseMeet(meet: Meet): void {
    this.meetService.refuseMeet(meet.id).subscribe({
      next: () => {
        meet.status = 'REFUSED';
        this.helper.setSuccessMessageInState("Your meet has been refused with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public closeMeet(meet: Meet): void {
    this.meetService.closeMeet(meet.id).subscribe({
      next: () => {
        meet.status = 'CLOSED';
        this.helper.setSuccessMessageInState("Your meet has been closed with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public openShowMeet(meet: Meet): void {
    let meetsState = this.store.state.meetsState;
    meetsState = {...meetsState, ...{openMeet: true, selectedMeet: meet}}
    this.store.setState({meetsState: meetsState});
  }

  public closeShowMeet(): void {
    let meetsState = this.store.state.meetsState;
    meetsState = {...meetsState, ...{openMeet: false, selectedMeet: null}}
    this.store.setState({meetsState: meetsState});
  }

  public openGetStats(application: Application) {
    this.store.setState({statsState: {openGetStats: true, selectedApplication: application}});
  }

  public closeGetStats(): void {
    this.store.setState({statsState: {openGetStats: false, selectedApplication: null}});
  }

  public openUpdateTalentProfile(): void {
    let talentState = this.store.state.talentState;
    talentState = {...talentState, ...{openUpdateInfos: true}};
    this.store.setState({talentState: talentState});
  }

  public closeUpdateTalentProfile(): void {
    let talentState = this.store.state.talentState;
    talentState = {...talentState, ...{openUpdateInfos: false}};
    this.store.setState({talentState: talentState});
  }

  public openUpdateClientProfile(): void {
    let clientState = this.store.state.clientState;
    clientState = {...clientState, ...{openUpdateInfos: true}};
    this.store.setState({clientState: clientState});
  }

  public closeUpdateClientProfile(): void {
    let clientState = this.store.state.clientState;
    clientState = {...clientState, ...{openUpdateInfos: false}}
    this.store.setState({clientState: clientState});
  }

  public closeJobProcess(job: Job): void {
    this.jobService.closeJobProcess(job.id).subscribe({
      next: () => {
        if (job.status == 'IN_APPROVING')
          job.status = 'CLIENT_CLOSE';
        else
          job.status = 'ADMIN_CLOSE';
        this.helper.setSuccessMessageInState("Job has been closed with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public openAskForJobInterview(application: Application): void {
    this.store.setState({jobInterviewsState: {openAskForJobInterview: true, selectedApp: application}});
  }

  public closeAskForJobInterview(): void {
    this.store.setState({jobInterviewsState: {openAskForJobInterview: false, selectedApp: undefined}});
  }

  public addJobInterview(application: Application, jobInterview: JobInterview): void {
    this.jobInterviewService.addJobInterview(application.id, jobInterview).subscribe({
      next: (jobInterview: JobInterview) => {
        application.hasClientMeet = true;
        this.dispatcherSubject.next({eventType: EventType.CLOSE_ASK_FOR_JOB_INTERVIEW});
        this.helper.setSuccessMessageInState("Your request for the interview with the talent has been sent to admins with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public openJobInterview(application: Application): void {
    this.store.setState({jobInterviewState: {openJobInterview: true, selectedApplication: application}});
  }

  public closeJobInterview(): void {
    this.store.setState({jobInterviewState: {openJobInterview: false, selectedApplication: undefined}});
  }

  public openAddClientMeet(job: Job, application: Application, date: string): void {
    this.dispatcherSubject.next({eventType: EventType.CLOSE_JOB_INTERVIEW});
    this.store.setState({
      programClientMeet: {
        openAddClientMeet: true,
        job: job,
        application: application,
        date: date
      }
    });
  }

  public closeAddClientMeet(): void {
    this.store.setState({
      programClientMeet: {
        openAddClientMeet: false
      }
    });
  }

  public programClientMeet(meet: Meet): void {
    this.jobInterviewService.acceptJobInterview(meet.application.jobInterviews[0].id).subscribe({
      next: () => {
        this.meetService.addMeet(meet).subscribe({
          next: () => {
            this.dispatcherSubject.next({eventType: EventType.CLOSE_ADD_CLIENT_MEET});
            meet.application.jobInterviews[0].status = "ACCEPTED";
            this.helper.setSuccessMessageInState("The client meet has been programmed with success.");
          },
          error: (error: HttpErrorResponse) => {
            this.helper.setErrorInState(error);
          }
        });
      }, error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }


  public getMySelections(payload: any): void {
    this.selectionService.getMySelections(payload.page, payload.size).subscribe({
      next: (selectionsPage: Page<Selection>) => {
        this.store.setState({mySelectionsState: {selectionsPage: selectionsPage}});
      }, error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public getSelections(payload: any): void {
    this.selectionService.getSelections(payload.status, payload.page, payload.size).subscribe({
      next: (selectionsPage: Page<Selection>) => {
        this.store.setState({selectionsState: {selectionsPage: selectionsPage}});
      }, error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public getSelection(id: number): void {
    this.selectionService.getSelectionById(id).subscribe({
      next: (selection: Selection) => {
        this.store.setState({selectionState: {selection: selection}});
      }, error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public addSelection(selection: SelectionRequest): void {
    this.selectionService.addSelection(selection).subscribe({
      next: (selection: Selection) => {
        let mySelectionsState = this.store.state.mySelectionsState;
        mySelectionsState.selectionsPage.content.unshift(selection);
        this.store.setState({mySelectionsState: mySelectionsState});
        this.dispatcherSubject.next({eventType: EventType.CLOSE_ADD_SELECTION});
        this.clearLocalTalents();
        this.helper.setSuccessMessageInState("Your selection has been added with success.");
      }, error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public deleteSelection(id: number): void {
    this.selectionService.deleteSelection(id).subscribe({
      next: () => {
        let mySelectionsState = this.store.state.mySelectionsState;
        mySelectionsState.selectionsPage.content = mySelectionsState.selectionsPage.content
          .filter((selection: Selection) => selection.id != id);
        this.store.setState({mySelectionsState: mySelectionsState});
        this.helper.setSuccessMessageInState("Your selection has been deleted with success.");
      }, error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public selectTalentInLocal(talentId: number): void {
    let localTalentsState = this.store.state.localTalentsState;
    if (localTalentsState.localTalents.includes(talentId))
      alert("Talent is already selected!");
    else if (localTalentsState.localTalents.length == 5)
      alert("You can't select more than 5 talents.");
    else {
      localTalentsState.localTalents.push(talentId);
      this.store.setState({localTalentsState: localTalentsState});
      localStorage.setItem("localTalents", localTalentsState.localTalents);
    }
  }

  public unselectTalentInLocal(talentId: number): void {
    let localTalentsState = this.store.state.localTalentsState;
    if (!localTalentsState.localTalents.includes(talentId))
      alert("Talent does not exists in selected list!")
    else {
      localTalentsState.localTalents = localTalentsState.localTalents.filter((id: number) => id != talentId);
      this.store.setState({localTalentsState: localTalentsState});
      localStorage.setItem("localTalents", localTalentsState.localTalents);
    }
  }

  public getTalentsInLocal(): void {
    this.store.setState({localTalentsState: this.store.state.localTalentsState});
  }

  public loadLocalTalents(): void {
    let localTalents = localStorage.getItem("localTalents");
    if (localTalents) {
      this.store.setState({localTalentsState: {localTalents: localTalents.split(",").map(Number)}});
    }
  }

  public clearLocalTalents(): void {
    this.store.setState({localTalentsState: {localTalents: []}});
    localStorage.removeItem("localTalents");
  }

  public openAddSelection(): void {
    let mySelectionsState = {...this.store.state.mySelectionsState, ...{openAddSelection: true}};
    this.store.setState({mySelectionsState: mySelectionsState});
  }

  public closeAddSelection(): void {
    let mySelectionsState = {...this.store.state.mySelectionsState, ...{openAddSelection: false}};
    this.store.setState({mySelectionsState: mySelectionsState});
  }

  public openSelectionReport(item: ItemResponse): void {
    let selectionState = this.store.state.selectionState;
    selectionState = {...selectionState, ...{openSelectionReport: true, selectedItem: item}};
    this.store.setState({selectionState: selectionState});
  }

  public closeSelectionReport(): void {
    let selectionState = this.store.state.selectionState;
    selectionState = {...selectionState, ...{openSelectionReport: false, selectedItem: undefined}};
    this.store.setState({selectionState: selectionState});
  }

  public updateSelectionItem(item: ItemResponse): void {
    this.selectionService.updateSelectionItem(item).subscribe({
      next: (itemResponse: ItemResponse) => {
        let selectionState = this.store.state.selectionState;
        selectionState.selection.items = selectionState.selection.items.map((item: ItemResponse) => {
          if (item.id == itemResponse.id) item = itemResponse;
          return item;
        });
        this.store.setState({selectionState: selectionState});
        this.dispatcherSubject.next({eventType: EventType.CLOSE_SELECTION_REPORT});
        this.helper.setSuccessMessageInState("Report has been added with success.");
      }, error: (error: HttpErrorResponse) => this.helper.setErrorInState(error)
    });
  }

  public acceptSelection(selection: Selection): void {
    this.selectionService.acceptSelection(selection.id).subscribe({
      next: () => {
        selection.status = 'ACCEPTED';
        selection.items = selection.items.map(se => {
          se.selectionStatus = 'ACCEPTED';
          return se;
        });
        this.helper.setSuccessMessageInState("Selection accepted with success.");
      }, error: (error: HttpErrorResponse) => this.helper.setErrorInState(error)
    });
  }

  public refuseSelection(selection: Selection): void {
    this.selectionService.refuseSelection(selection.id).subscribe({
      next: () => {
        selection.status = 'REFUSED';
        selection.items = selection.items.map(se => {
          se.selectionStatus = 'REFUSED';
          return se;
        });
        this.helper.setSuccessMessageInState("Selection refused with success.");
      }, error: (error: HttpErrorResponse) => this.helper.setErrorInState(error)
    });
  }

  public startSelectionChoosing(selection: Selection): void {
    this.selectionService.startSelectionChoosing(selection.id).subscribe({
      next: () => {
        selection.status = 'IN_CHOOSING';
        selection.items = selection.items.map(se => {
          se.selectionStatus = 'IN_CHOOSING';
          return se;
        });
        this.helper.setSuccessMessageInState("Selection in choosing with success.");
      }, error: (error: HttpErrorResponse) => this.helper.setErrorInState(error)
    });
  }

  public closeSelection(selection: Selection): void {
    this.selectionService.closeSelection(selection.id).subscribe({
      next: () => {
        selection.status = 'CLOSED';
        selection.items = selection.items.map(se => {
          se.selectionStatus = 'CLOSED';
          return se;
        });
        this.helper.setSuccessMessageInState("Selection closed with success.");
      }, error: (error: HttpErrorResponse) => this.helper.setErrorInState(error)
    });
  }

  public selectTalentForSelection(selectionItem: ItemResponse): void {
    this.selectionService.selectTalent(selectionItem.id).subscribe({
      next: () => {
        selectionItem.selected = !selectionItem.selected;
        this.helper.setSuccessMessageInState("Selection status for this talent has been changed with success.");
      }, error: (error: HttpErrorResponse) => this.helper.setErrorInState(error)
    });
  }
}
