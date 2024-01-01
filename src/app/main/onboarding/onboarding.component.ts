import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppControlService } from 'src/app/services/app-control.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { DataService } from 'src/app/services/data.service';

declare var TsSdk: any;

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent {
  showIntroOnboarding: boolean = false;
  showJif: boolean = false;

  constructor(
    public appControlService: AppControlService,
    private dataService: DataService,
    private commService: CommunicationService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.commService.callbacksObservable.subscribe((callbackObj: any) => {
      switch (callbackObj.callbackEvent) {
        case 'fetched_jira_history': {
          this._snackBar.open(callbackObj.callbackData.message, 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
          });
          this.showJif = false;
          this.appControlService.showOnboarding = false;
          break;
        }
        case 'onboarding_updated': {
          this.showIntroOnboarding = false;
          this.showJif = true;
          break;
        }
      }
    });
    this.showIntroOnboarding = !this.dataService.userObj.onboarding.intro;
    if (
      !this.showIntroOnboarding &&
      !this.dataService.userObj.jira.isInitFetchCompleted
    )
      this.showJif = true;

    // if (this.router.url == '/' && !this.showIntroOnboarding && !this.showJif)
    this.appControlService.showOnboarding = false;
  }

  obCompleted(component: string): void {
    try {
      this.dataService.userObj.onboarding[component] = true;
      TsSdk.updateOnboarding({ obObj: this.dataService.userObj.onboarding });
    } catch (error) {
      console.error(error);
    }
  }

  onJifCompleted(): void {
    this.showJif = false;
  }
}
