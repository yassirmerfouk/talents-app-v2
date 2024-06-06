import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {TalentService} from "../../../services/talent.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Talent, TalentRequest} from "../../../models/talent.model";
import {EventService} from "../../../services/event.service";
import {ActionEvent} from "../../../state/action-event.event";
import {EventType} from "../../../state/event-type.enum";
import {ExperienceService} from "../../../services/experience.service";
import {Experience} from "../../../models/experience.model";
import {Education} from "../../../models/education.model";
import {EducationService} from "../../../services/education.service";
import {Project} from "../../../models/project.model";
import {ProjectService} from "../../../services/project.service";
import {LanguageService} from "../../../services/language.service";
import {Language} from "../../../models/language.model";
import {CertificationService} from "../../../services/certification.service";
import {Certification} from "../../../models/certification.model";
import {UserService} from "../../../services/user.service";
import {Store} from "../../../state/store.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-talent-profile',
  templateUrl: './talent-profile.component.html',
  styleUrl: './talent-profile.component.css'
})
export class TalentProfileComponent implements OnInit, OnDestroy {

  private store : Store = inject(Store);
  private eventService : EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private userService: UserService = inject(UserService);
  private talentService: TalentService = inject(TalentService);
  private experienceService: ExperienceService = inject(ExperienceService);
  private educationService: EducationService = inject(EducationService);
  private projectService: ProjectService = inject(ProjectService);
  private languageService: LanguageService = inject(LanguageService);
  private certificationService: CertificationService = inject(CertificationService);

  private formBuilder: FormBuilder = inject(FormBuilder);

  public talent !: Talent;
  public talentForm !: FormGroup;
  public imageForm !: FormGroup;

  private image !: File;

  public ngOnInit(): void {

    this.stateSubscription = this.store.state$.subscribe(
      (state : any) => {
        this.talent = state.talentState.talent;
        if(this.talent){
          this.talentForm = this.formBuilder.group({
            lastName: this.formBuilder.control(this.talent.lastName),
            firstName: this.formBuilder.control(this.talent.firstName),
            email: this.formBuilder.control(this.talent.email),
            phone: this.formBuilder.control(this.talent.phone),
            title: this.formBuilder.control(this.talent.title),
            summary: this.formBuilder.control(this.talent.summary),
            dateOfBirth: this.formBuilder.control(this.talent.dateOfBirth),
            city: this.formBuilder.control(this.talent.city),
            address: this.formBuilder.control(this.talent.address),
          });
          this.imageForm = this.formBuilder.group({
            image: this.formBuilder.control(null)
          });
        }
      }
    );

    this.getTalentProfile();

  }

  private getTalentProfile() : void {
    this.eventService.dispatchEvent({eventType : EventType.GET_TALENT_PROFILE});
  }

  public handleSelectImage($event: any): void {
    this.image = $event.target.files.item(0);
  }

  public handleUpdateProfile(): void {
    let talentRequest: TalentRequest = this.talentForm.value;
    this.eventService.dispatchEvent({eventType: EventType.UPDATE_TALENT_PROFILE, payload: talentRequest})
  }

  public handleAskForVerification(): void {
    this.eventService.dispatchEvent({eventType: EventType.ASK_VERIFICATION, payload : this.talent});
  }

  private updateImage(): void {
    this.userService.updateImage(this.image).subscribe({
      next: (image: any) => {
        this.talent.image = image;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public addEducation(education: Education): void {
    this.educationService.addEducation(education).subscribe({
      next: (education: Education) => {
        this.talent.educations.unshift(education);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public updateEducation(education: Education): void {
    this.educationService.updateEducation(education).subscribe({
      next: (education: Education) => {
        this.talent.educations = this.talent.educations.map((edu: Education) => {
          if (edu.id == education.id) edu = education;
          return edu;
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public deleteEducation(id: number): void {
    this.educationService.deleteEducation(id).subscribe({
      next: () => {
        this.talent.educations = this.talent.educations.filter((education: Education) => education.id != id);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public addProject(project: Project): void {
    this.projectService.addProject(project).subscribe({
      next: (project: Project) => {
        this.talent.projects.unshift(project);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public updateProject(project: Project): void {
    this.projectService.updateProject(project).subscribe({
      next: (project: Project) => {
        this.talent.projects = this.talent.projects.map((pro: Project) => {
          if (pro.id == project.id) pro = project;
          return pro;
        })
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public deleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe({
      next: () => {
        this.talent.projects = this.talent.projects.filter((project: Project) => project.id != id);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public addLanguage(language: Language): void {
    this.languageService.addLanguage(language).subscribe({
      next: (language: Language) => {
        this.talent.languages.push(language);
        this.eventService.publishEvent({eventType: EventType.CLOSE_ADD_LANGUAGE});
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public updateLanguage(language: Language): void {
    this.languageService.updateLanguage(language).subscribe({
      next: (language: Language) => {
        this.talent.languages = this.talent.languages.map((lang: Language) => {
          if (lang.id == language.id) lang = language;
          return lang;
        });
        this.eventService.publishEvent({eventType: EventType.CLOSE_EDIT_LANGUAGE});
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public deleteLanguage(id: number): void {
    this.languageService.deleteLanguage(id).subscribe({
      next: () => this.talent.languages = this.talent.languages.filter((language: Language) => language.id != id),
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public addCertification(certification: Certification): void {
    this.certificationService.addCertification(certification).subscribe({
      next: (certification: Certification) => {
        this.talent.certifications.push(certification);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public updateCertification(certification: Certification): void {
    this.certificationService.updateCertification(certification).subscribe({
      next: (certification: Certification) => {
        this.talent.certifications = this.talent.certifications.map((cert: Certification) => {
          if (cert.id == certification.id) cert = certification;
          return cert;
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public deleteCertification(id: number): void {
    this.certificationService.deleteCertification(id).subscribe({
      next: () => this.talent.certifications = this.talent.certifications.filter((certification: Certification) => certification.id != id),
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }


  public handleUpdateImage(): void {
    this.eventService.publishEvent({eventType: EventType.UPDATE_IMAGE});
  }



  public ngOnDestroy() : void {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }
}
