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
  private talentService: TalentService = inject(TalentService);
  private experienceService: ExperienceService = inject(ExperienceService);
  private educationService: EducationService = inject(EducationService);
  private projectService: ProjectService = inject(ProjectService);
  private languageService: LanguageService = inject(LanguageService);
  private certificationService: CertificationService = inject(CertificationService);
  private meetService: MeetService = inject(MeetService);

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
          case EventType.GET_JOB_APPROVED_APPLICATIONS :
            this.getApprovedJobApplications($event.payload);
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
          case EventType.ASK_TO_START_PROCESS :
            this.askToStartProcess($event.payload);
            break;
          case EventType.START_PROCESS :
            this.startProcess($event.payload);
            break;
          case EventType.START_SELECTION :
            this.startSelection($event.payload);
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
        }
      }
    );
  }


  public login(authenticationRequest: AuthenticationRequest): void {
    this.authService.login(authenticationRequest).subscribe({
      next: (response: AuthenticationResponse) => {
        if(this.authStateService.loadUser(response.accessToken)){
          this.authStateService.storeTokenInLocalStorage(response.accessToken);
          if (this.authStateService.hasAuthority('TALENT'))
            this.router.navigateByUrl('/jobs');
          if (this.authStateService.hasAuthority('CLIENT'))
            this.router.navigateByUrl('/jobs');
          if (this.authStateService.hasAuthority('ADMIN'))
            this.router.navigateByUrl('/admin/jobs');
        }
      },
      error: (error: HttpErrorResponse) => {
        this.store.setState({
          loginState: {
            error: error.error?.message,
            errors: error.error?.errors
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
        this.store.setState({
          registerTalentState: {
            error: error.error?.message,
            errors: error.error?.errors
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

  public getApprovedJobApplications(id : number) : void{
    this.jobService.getSelectedJobApplication(id).subscribe({
      next : (approvedApplications : Array<Application>) => {
        let jobsState = {...this.store.state.jobsState, ...{approvedApplications : approvedApplications}};
        this.store.setState({
          jobsState : jobsState
        });
      },
      error : (error : HttpErrorResponse) => {
        console.log(error);
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
        this.store.setState({profileImage: image});
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
      },
      error: (error: HttpErrorResponse) => console.log(error)
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
      },
      error: (error: HttpErrorResponse) => console.log(error)
    });
  }

  public deleteJob(id: number): void {
    this.jobService.deleteJob(id).subscribe({
      next: () => {
        let jobsPage = this.store.state.jobsState.jobsPage;
        jobsPage.content = jobsPage.content.filter((job: Job) => job.id != id);
        let jobsState = {...this.store.state.jobsState, ...{jobsPage: jobsPage}};
        this.store.setState(jobsState);
      },
      error: (error: HttpErrorResponse) => console.log(error)
    });
  }

  public getTalents(payload: any): void {
    this.talentService.getTalents(payload.status, payload.page, payload.size).subscribe({
      next: (talentsPage: Page<Talent>) => {
        this.store.setState({talentsState: {talentsPage: talentsPage}});
      },
      error: (error: HttpErrorResponse) => console.log(error)
    });
  }

  public getTalent(id: number): void {
    this.talentService.getTalent(id).subscribe({
      next: (talent: Talent) => {
        this.reverseTalent(talent);
        this.store.setState({talentState: {talent: talent}});
      },
      error: (error: HttpErrorResponse) => console.log(error)
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
        console.log(error)
      }
    });
  }

  private updateTalentProfile(talentRequest: TalentRequest): void {
    this.talentService.updateProfile(talentRequest).subscribe({
      next: (talent: any) => {
        this.reverseTalent(talent);
        this.store.setState({talentState: {talent: talent}});
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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

      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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

  private askToStartProcess(job: Job): void {
    this.jobService.askToStartProcess(job.id).subscribe({
      next: () => {
        job.status = 'WAITING';
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  private startProcess(job: Job): void {
    this.jobService.startProcess(job.id).subscribe({
      next: () => {
        job.status = 'IN_PROCESS'
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  private startSelection(job: Job): void {
    this.jobService.startSelection(job.id).subscribe({
      next: () => {
        job.status = 'IN_SELECTION'
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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
      next: (meet: Meet) => {
        console.log(meet);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public getMeets(payload: any): void {
    this.meetService.getMeets(payload.date, payload.page, payload.size).subscribe({
      next: (meetsPage: Page<Meet>) => {
        this.store.setState({meetsState: {meetsPage: meetsPage}});
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public acceptMeet(meet: Meet): void {
    this.meetService.acceptMeet(meet.id).subscribe({
      next: () => {
        meet.status = 'ACCEPTED';
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public refuseMeet(meet: Meet): void {
    this.meetService.refuseMeet(meet.id).subscribe({
      next: () => {
        meet.status = 'REFUSED';
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public closeMeet(meet: Meet): void {
    this.meetService.closeMeet(meet.id).subscribe({
      next: () => {
        meet.status = 'CLOSED';
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public openShowMeet(meet : Meet) : void {
    let meetsState = this.store.state.meetsState;
    meetsState = {...meetsState, ...{openMeet : true, selectedMeet : meet}}
    this.store.setState({meetsState : meetsState});
  }

  public closeShowMeet() : void {
    let meetsState = this.store.state.meetsState;
    meetsState = {...meetsState, ...{openMeet : false, selectedMeet : null}}
    this.store.setState({meetsState : meetsState});
  }
}
