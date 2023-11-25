import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { SettingsComponent } from './main/settings/settings.component';
import { ProfileSettingsComponent } from './main/settings/profile-settings/profile-settings.component';
import { BoardSettingsComponent } from './main/settings/board-settings/board-settings.component';
import { JiraSettingsComponent } from './main/settings/jira-settings/jira-settings.component';
import { AboutComponent } from './main/settings/about/about.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { TimesheetSettingsComponent } from './main/settings/timesheet-settings/timesheet-settings.component';
import { TeamComponent } from './main/team/team.component';
import { TimesheetComponent } from './main/timesheet/timesheet.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'team',
        component: TeamComponent,
      },
      {
        path: 'timesheet',
        component: TimesheetComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '/settings/profile',
          },
          {
            path: 'profile',
            component: ProfileSettingsComponent,
          },
          {
            path: 'board',
            component: BoardSettingsComponent,
          },
          {
            path: 'about',
            component: AboutComponent,
          },
          {
            path: 'jira',
            component: JiraSettingsComponent,
          },
          {
            path: 'timesheet',
            component: TimesheetSettingsComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    component: AuthorizationComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
