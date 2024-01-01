import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  DragDropModule,
} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { CommonModule, DatePipe } from '@angular/common';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareComponent } from './main/dashboard/share/share.component';
import { OutsideClickDirective } from './directives/outside-click.directive';
import { JoinTeamComponent } from './main/sidebar/join-team/join-team.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OnboardingComponent } from './main/onboarding/onboarding.component';
import { IntroComponent } from './main/onboarding/intro/intro.component';
import { NewBoardComponent } from './main/sidebar/new-board/new-board.component';
import { MemberSwitchComponent } from './main/dashboard/member-switch/member-switch.component';
import { ExportTaskComponent } from './main/dashboard/export-task/export-task.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NotificationsComponent } from './main/dashboard/notifications/notifications.component';
import { AddTaskComponent } from './main/dashboard/add-task/add-task.component';
import { NotilandComponent } from './shared/notiland/notiland.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskbarComponent } from './main/dashboard/taskbar/taskbar.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { SettingsComponent } from './main/settings/settings.component';
import { ProfileSettingsComponent } from './main/settings/profile-settings/profile-settings.component';
import { BoardSettingsComponent } from './main/settings/board-settings/board-settings.component';
import { JiraSettingsComponent } from './main/settings/jira-settings/jira-settings.component';
import { AboutComponent } from './main/settings/about/about.component';
import { TimesheetSettingsComponent } from './main/settings/timesheet-settings/timesheet-settings.component';
import { TeamComponent } from './main/team/team.component';
import { TimesheetComponent } from './main/timesheet/timesheet.component';
import { DataService } from './services/data.service';
import { SevereErrorComponent } from './shared/severe-error/severe-error.component';
import { JiraInitFetcherComponent } from './main/onboarding/jira-init-fetcher/jira-init-fetcher.component';
import { NewTeamComponent } from './main/team/new-team/new-team.component';

export function playerFactory() {
  return player;
}

export function checkQueryParamsChange(dataService: DataService) {
  return async () => await dataService.fetchConfig();
}
@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    MainComponent,
    DashboardComponent,
    SidebarComponent,
    ShareComponent,
    OutsideClickDirective,
    JoinTeamComponent,
    OnboardingComponent,
    IntroComponent,
    NewBoardComponent,
    MemberSwitchComponent,
    ExportTaskComponent,
    NotificationsComponent,
    AddTaskComponent,
    NotilandComponent,
    TaskbarComponent,
    SettingsComponent,
    ProfileSettingsComponent,
    BoardSettingsComponent,
    JiraSettingsComponent,
    AboutComponent,
    TimesheetSettingsComponent,
    TeamComponent,
    TimesheetComponent,
    SevereErrorComponent,
    JiraInitFetcherComponent,
    NewTeamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    DragDropModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    MatSnackBarModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [
    DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: checkQueryParamsChange,
      deps: [DataService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
