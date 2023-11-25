import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { ApiService } from 'src/app/services/api.service';
import { AppControlService } from 'src/app/services/app-control.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent {
  zohoLoginAnimation: AnimationOptions = {
    path: 'assets/images/main/timesheet/zohologin.json',
    loop: true,
    autoplay: true,
  };

  constructor(
    public appControlService: AppControlService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    const authCode = this.activatedRoute.snapshot.queryParamMap.get('code');
    if (authCode) {
      this.apiService
        .getZohoAccessToken(authCode)
        .subscribe((response: any) => {
          console.log(response);
        });
    }
  }

  onAuthenticateZohoProjects(): void {
    try {
      this.apiService.requestZohoOauthUrl()?.subscribe(
        (response: any) => {
          location.href = response.data;
        },
        (error: any) => {
          this.appControlService.confirmDialog(
            'Something bad happened. Please try again later',
            (result: any) => {
            }
          );
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
