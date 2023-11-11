import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { CommonModule } from '@angular/common';
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
import { ObProfileComponent } from './main/onboarding/ob-profile/ob-profile.component';
import { NewBoardComponent } from './main/sidebar/new-board/new-board.component';

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
    ObProfileComponent,
    NewBoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
