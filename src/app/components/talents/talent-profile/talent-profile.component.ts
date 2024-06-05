import {Component, inject, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-talent-profile',
  templateUrl: './talent-profile.component.html',
  styleUrl: './talent-profile.component.css'
})
export class TalentProfileComponent implements OnInit {

  private userService: UserService = inject(UserService);
  private talentService: TalentService = inject(TalentService);
  private experienceService: ExperienceService = inject(ExperienceService);
  private educationService: EducationService = inject(EducationService);
  private projectService: ProjectService = inject(ProjectService);
  private languageService: LanguageService = inject(LanguageService);
  private certificationService: CertificationService = inject(CertificationService);

  private formBuilder: FormBuilder = inject(FormBuilder);
  private eventService: EventService = inject(EventService);

  public talent !: Talent;
  public talentForm !: FormGroup;
  public imageForm !: FormGroup;

  private image !: File;

  public ngOnInit(): void {
    this.talentService.profile().subscribe({
      next: (talent: Talent) => {
        this.talent = talent;
        this.reverseTalent();
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
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    });

    this.eventService.event$.subscribe({
      next: ($event: ActionEvent) => this.handleEvent($event)
    });

  }

  private handleEvent($event: ActionEvent): void {
    switch ($event.eventType) {
      case EventType.UPDATE_TALENT_PROFILE :
        this.updateTalentProfile($event.payload);
        break;
      case EventType.UPDATE_IMAGE :
        this.updateImage();
        break;
      case EventType.ASK_VERIFICATION :
        this.askForVerification();
        break;
      case EventType.ADD_EXPERIENCE :
        this.addExperience($event.payload);
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
      case EventType.ADD_PROJECT :
        this.addProject($event.payload);
        break;
      case EventType.UPDATE_PROJECT :
        this.updateProject($event.payload);
        break;
      case EventType.DELETE_PROJECT :
        this.deleteProject($event.payload);
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
      case EventType.ADD_CERTIFICATION :
        this.addCertification($event.payload);
        break;
      case EventType.UPDATE_CERTIFICATION :
        this.updateCertification($event.payload);
        break;
      case EventType.DELETE_CERTIFICATION :
        this.deleteCertification($event.payload);
        break;
    }
  }

  public handleSelectImage($event: any): void {
    this.image = $event.target.files.item(0);
  }

  private updateTalentProfile(talentRequest: TalentRequest): void {
    this.talentService.updateProfile(talentRequest).subscribe({
      next: (talent: any) => {
        this.talent = talent;
        this.reverseTalent();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
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

  private askForVerification(): void {
    this.userService.askForVerification().subscribe({
      next: () => {
        this.talent.status = 'WAITING';
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  private addExperience(experience: Experience): void {
    this.experienceService.addExperience(experience).subscribe({
      next: (experience: Experience) => {
        this.talent.experiences.unshift(experience);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  private updateExperience(experience: Experience): void {
    this.experienceService.updateExperience(experience).subscribe({
      next: (experience: Experience) => {
        this.talent.experiences = this.talent.experiences.map((exp: Experience) => {
          if (exp.id == experience.id) exp = experience;
          return exp;
        })
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  private deleteExperience(id: number): void {
    this.experienceService.deleteExperience(id).subscribe({
      next: () => {
        this.talent.experiences = this.talent.experiences.filter((experience: { id: number; }) => experience.id != id);
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

  public handleUpdateProfile(): void {
    let talentRequest: TalentRequest = this.talentForm.value;
    this.eventService.publishEvent({eventType: EventType.UPDATE_TALENT_PROFILE, payload: talentRequest})
  }

  public handleUpdateImage(): void {
    this.eventService.publishEvent({eventType: EventType.UPDATE_IMAGE});
  }

  public handleAskForVerification(): void {
    this.eventService.publishEvent({eventType: EventType.ASK_VERIFICATION});
  }

  public reverseTalent(): void {
    this.talent.experiences = this.talent.experiences.reverse();
    this.talent.educations = this.talent.educations.reverse();
    this.talent.projects = this.talent.projects.reverse();
  }
}
