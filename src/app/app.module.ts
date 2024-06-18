import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RegistrationTalentComponent } from './components/auth/registration/registration-talent/registration-talent.component';
import { RegistrationClientComponent } from './components/auth/registration/registration-client/registration-client.component';
import { LoginComponent } from './components/auth/login/login.component';
import { TalentProfileComponent } from './components/talents/talent-profile/talent-profile.component';
import {httpInterceptor} from "./interceptors/http.interceptor";
import { ExperiencesComponent } from './components/talents/talent-profile/experiences/experiences.component';
import { ExperienceComponent } from './components/talents/talent-profile/experiences/experience/experience.component';
import { AddExperienceComponent } from './components/talents/talent-profile/experiences/add-experience/add-experience.component';
import { EditExperienceComponent } from './components/talents/talent-profile/experiences/edit-experience/edit-experience.component';
import { EducationsComponent } from './components/talents/talent-profile/educations/educations.component';
import { EducationComponent } from './components/talents/talent-profile/educations/education/education.component';
import { AddEducationComponent } from './components/talents/talent-profile/educations/add-education/add-education.component';
import { EditEducationComponent } from './components/talents/talent-profile/educations/edit-education/edit-education.component';
import { ProjectsComponent } from './components/talents/talent-profile/projects/projects.component';
import { AddProjectComponent } from './components/talents/talent-profile/projects/add-project/add-project.component';
import { EditProjectComponent } from './components/talents/talent-profile/projects/edit-project/edit-project.component';
import { ProjectComponent } from './components/talents/talent-profile/projects/project/project.component';
import { LanguagesComponent } from './components/talents/talent-profile/languages/languages.component';
import { LanguageComponent } from './components/talents/talent-profile/languages/language/language.component';
import { AddLanguageComponent } from './components/talents/talent-profile/languages/add-language/add-language.component';
import { EditLanguageComponent } from './components/talents/talent-profile/languages/edit-language/edit-language.component';
import { CertificationsComponent } from './components/talents/talent-profile/certifications/certifications.component';
import { CertificationComponent } from './components/talents/talent-profile/certifications/certification/certification.component';
import { AddCertificationComponent } from './components/talents/talent-profile/certifications/add-certification/add-certification.component';
import { EditCertificationComponent } from './components/talents/talent-profile/certifications/edit-certification/edit-certification.component';
import { ClientProfileComponent } from './components/clients/client-profile/client-profile.component';
import { MyJobsComponent } from './components/clients/my-jobs/my-jobs.component';
import { AddJobComponent } from './components/clients/my-jobs/add-job/add-job.component';
import { EditJobComponent } from './components/clients/my-jobs/edit-job/edit-job.component';
import { AdminClientsComponent } from './components/clients/admin-clients/admin-clients.component';
import { AdminTalentsComponent } from './components/talents/admin-talents/admin-talents.component';
import { AdminJobsComponent } from './components/jobs/admin-jobs/admin-jobs.component';
import { TalentComponent } from './components/talents/talent/talent.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { ConfirmationComponent } from './components/auth/confirmation/confirmation.component';
import {CodeInputModule} from "angular-code-input";
import { ClientComponent } from './components/clients/client/client.component';
import { JobsComponent } from './components/jobs/jobs/jobs.component';
import { JobComponent } from './components/jobs/job/job.component';
import { JobModalComponent } from './components/jobs/job-modal/job-modal.component';
import { TalentsComponent } from './components/talents/talents/talents.component';
import {NgToastModule} from "ng-angular-popup";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SkillsComponent } from './components/talents/talent-profile/skills/skills.component';
import { EditSkillsComponent } from './components/talents/talent-profile/skills/edit-skills/edit-skills.component';
import { AddMeetComponent } from './components/meets/add-meet/add-meet.component';
import { MeetsComponent } from './components/meets/meets/meets.component';
import { MeetComponent } from './components/meets/meets/meet/meet.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationTalentComponent,
    RegistrationClientComponent,
    LoginComponent,
    TalentProfileComponent,
    ExperiencesComponent,
    ExperienceComponent,
    AddExperienceComponent,
    EditExperienceComponent,
    EducationsComponent,
    EducationComponent,
    AddEducationComponent,
    EditEducationComponent,
    ProjectsComponent,
    AddProjectComponent,
    EditProjectComponent,
    ProjectComponent,
    LanguagesComponent,
    LanguageComponent,
    AddLanguageComponent,
    EditLanguageComponent,
    CertificationsComponent,
    CertificationComponent,
    AddCertificationComponent,
    EditCertificationComponent,
    ClientProfileComponent,
    MyJobsComponent,
    AddJobComponent,
    EditJobComponent,
    AdminClientsComponent,
    AdminTalentsComponent,
    AdminJobsComponent,
    TalentComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ConfirmationComponent,
    ClientComponent,
    JobsComponent,
    JobComponent,
    JobModalComponent,
    TalentsComponent,
    SkillsComponent,
    EditSkillsComponent,
    AddMeetComponent,
    MeetsComponent,
    MeetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CodeInputModule.forRoot({
      codeLength: 6,
      isCharsCode: false
    }),
    NgToastModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : httpInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
