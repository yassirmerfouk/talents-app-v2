import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  RegistrationTalentComponent
} from "./components/auth/registration/registration-talent/registration-talent.component";
import {
  RegistrationClientComponent
} from "./components/auth/registration/registration-client/registration-client.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {TalentProfileComponent} from "./components/talents/talent-profile/talent-profile.component";
import {ClientProfileComponent} from "./components/clients/client-profile/client-profile.component";
import {MyJobsComponent} from "./components/clients/my-jobs/my-jobs.component";
import {AdminClientsComponent} from "./components/clients/admin-clients/admin-clients.component";
import {AdminTalentsComponent} from "./components/talents/admin-talents/admin-talents.component";
import {AdminJobsComponent} from "./components/jobs/admin-jobs/admin-jobs.component";
import {TalentComponent} from "./components/talents/talent/talent.component";
import {authenticationGuard} from "./guards/authentication.guard";
import {authorizationGuard} from "./guards/authorization.guard";
import {ForgotPasswordComponent} from "./components/auth/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./components/auth/reset-password/reset-password.component";
import {ConfirmationComponent} from "./components/auth/confirmation/confirmation.component";
import {guestGuard} from "./guards/guest.guard";
import {ClientComponent} from "./components/clients/client/client.component";
import {JobsComponent} from "./components/jobs/jobs/jobs.component";
import {JobComponent} from "./components/jobs/job/job.component";
import {TalentsComponent} from "./components/talents/talents/talents.component";
import {MeetsComponent} from "./components/meets/meets/meets.component";
import {NotificationsComponent} from "./components/notifications/notifications/notifications.component";
import {AdminSkillsComponent} from "./components/skills/admin-skills/admin-skills.component";
import {ClientSelectionsComponent} from "./components/selections/client-selections/client-selections.component";
import {AdminSelectionsComponent} from "./components/selections/admin-selections/admin-selections.component";
import {AddSelectionComponent} from "./components/selections/add-selection/add-selection.component";
import {SelectionComponent} from "./components/selections/selection/selection.component";
import {DashboardComponent} from "./components/dashboard/dashboard/dashboard.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: 'auth', canActivate: [guestGuard], children: [
      {
        path: 'registration', children: [
          {path: 'talent', component: RegistrationTalentComponent},
          {path: 'client', component: RegistrationClientComponent}
        ]
      },
      {path: 'login', component: LoginComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'reset-password/:token', component: ResetPasswordComponent},
      {path: 'account/confirmation', component: ConfirmationComponent}
    ]
  },
  {
    path: 'talent/my-profile',
    component: TalentProfileComponent,
    canActivate: [authenticationGuard, authorizationGuard],
    data: {role: 'TALENT'}
  },
  {
    path: 'client/my-profile',
    component: ClientProfileComponent,
    canActivate: [authenticationGuard, authorizationGuard],
    data: {role: 'CLIENT'}
  },
  {
    path: 'client/my-jobs',
    component: MyJobsComponent,
    canActivate: [authenticationGuard, authorizationGuard],
    data: {role: 'CLIENT'}
  },

  {
    path: 'client/my-selections',
    component: ClientSelectionsComponent,
    canActivate: [authenticationGuard, authorizationGuard],
    data: {role: 'CLIENT'}
  },

  {
    path: 'admin/clients',
    component: AdminClientsComponent,
    canActivate: [authenticationGuard, authorizationGuard],
    data: {role: 'ADMIN'}
  },

  {
    path: 'admin/talents',
    component: AdminTalentsComponent,
    canActivate: [authenticationGuard, authorizationGuard],
    data: {role: 'ADMIN'}
  },

  {
    path: 'admin/jobs',
    component: AdminJobsComponent,
    canActivate: [authenticationGuard, authorizationGuard],
    data: {role: 'ADMIN'}
  },

  {
    path: 'admin/meets',
    component: MeetsComponent,
    canActivate: [authenticationGuard, authorizationGuard],
    data: {role: 'ADMIN'}
  },

  {
    path: 'talent/:id', component: TalentComponent, canActivate: [authenticationGuard]
  },

  {
    path: 'client/:id', component: ClientComponent, canActivate: [authenticationGuard]
  },

  {
    path: 'jobs', component: JobsComponent, canActivate: [authenticationGuard]
  },

  {
    path: 'job/:id', component: JobComponent, canActivate: [authenticationGuard]
  },

  {
    path: 'talents', component: TalentsComponent, canActivate: [authenticationGuard]
  },

  {
    path: 'meets', component: MeetsComponent, canActivate: [authenticationGuard]
  },

  {
    path: 'notifications', component: NotificationsComponent, canActivate: [authenticationGuard]
  },

  {
    path: 'admin/skills',
    component: AdminSkillsComponent,
    canActivate: [authenticationGuard, authorizationGuard],
    data: {role: 'ADMIN'}
  },

  {
    path: 'selection/:id',
    component: SelectionComponent,
    canActivate: [authenticationGuard]
  },

  {
    path: 'admin/selections',
    component: AdminSelectionsComponent,
    canActivate: [authenticationGuard],
    data: {role: 'ADMIN'}
  },

  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [authenticationGuard, authorizationGuard],
    data: {role: 'ADMIN'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
