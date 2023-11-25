import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { ApiService } from 'src/app/services/api.service';
import { AppControlService } from 'src/app/services/app-control.service';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class TimesheetComponent implements OnInit {
  zohoLoginAnimation: AnimationOptions = {
    path: 'assets/images/main/timesheet/zohologin.json',
    loop: true,
    autoplay: true,
  };
  currentStage: number = 1;
  fromDate: Date = new Date();
  toDate: Date = new Date();
  today: Date = new Date();
  @ViewChild('datePicker1') datePicker1El!: ElementRef;
  @ViewChild('datePicker2') datePicker2El!: ElementRef;
  timesheetData = [
    {
      date: '20/11/2023',
      bin: [],
      active: [
        {
          taskId: 'PRODQA-3523',
          taskType: 'jira',
          project: 'Product QA',
          isApproved: false,
          taskname: 'Visual IVR AV Call Revamp',
          zohoProject: 'IIT_Compilers_Clan',
          zohoTask: 'Product issue fixing and troubleshooting',
        },
        {
          taskId: 'ENGQA-973',
          taskType: 'jira',
          project: 'Engineering QA',
          isApproved: false,
          taskname: 'Multimedia Dialog Box Responsiveness Issue',
          zohoProject: 'IIT_General_Activity_Tracker',
          zohoTask: 'QA troubleshooting / Internal meeting',
        },
        {
          taskId: 'TODO-434',
          taskType: 'todo',
          project: '',
          isApproved: false,
          taskname: 'Visual IVR AV Call Revampment',
          zohoProject: 'IIT_Compilers_Clan',
          zohoTask: 'Internal / Technical Meeting and Discussions',
        },
        {
          taskId: 'MSTCALL-26',
          taskType: 'msteams',
          project: '',
          isApproved: false,
          taskname: 'Issue discussion with Trishul Shetty',
          zohoProject: 'IIT_Compilers_Clan',
          zohoTask: 'Internal / Technical Meeting and Discussions',
        },
      ],
    },
  ];

  constructor(
    public appControlService: AppControlService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    const authCode = this.activatedRoute.snapshot.queryParamMap.get('code');
    if (authCode) {
      this.apiService.getZohoAccessToken(authCode).subscribe(
        (response: any) => {
          if (response?.data?.access_token) {
            localStorage.setItem(
              'zoho_access_token',
              response.data.access_token
            );
            this.currentStage = 1;
          } else {
            this.failedZohoFetchWarn();
          }
        },
        (error: any) => {
          this.failedZohoFetchWarn();
        }
      );
    }
  }

  ngOnInit(): void {
    this.setInitialDayOffsets();
  }

  setInitialDayOffsets(): void {
    try {
      var today = new Date();
      var dayOfWeek = today.getDay();
      var difference = dayOfWeek - 1;
      if (difference < 0) {
        difference += 7;
      }
      today.setDate(today.getDate() - difference);
      this.fromDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );

      let toDate = today;
      toDate.setDate(today.getDate() + 4);
      this.toDate = new Date(
        toDate.getFullYear(),
        toDate.getMonth(),
        toDate.getDate()
      );

      let maxDate = new Date();
      maxDate.setDate(new Date().getDate() - 1);
      this.today = new Date(
        maxDate.getFullYear(),
        maxDate.getMonth(),
        maxDate.getDate()
      );
    } catch (error) {
      console.error(error);
    }
  }

  onAuthenticateZohoProjects(): void {
    try {
      this.apiService.requestZohoOauthUrl()?.subscribe(
        (response: any) => {
          location.href = response.data;
        },
        (error: any) => {
          this.failedZohoFetchWarn();
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  failedZohoFetchWarn(): void {
    try {
      this.appControlService.confirmDialog(
        'Something bad happened. Please try again later',
        () => {}
      );
    } catch (error) {
      console.error(error);
    }
  }

  onPickerClosed(constraint: string): void {
    try {
      if (constraint == 'from')
        this.fromDate = new Date(this.datePicker1El.nativeElement.value);
      else this.toDate = new Date(this.datePicker2El.nativeElement.value);
    } catch (error) {
      console.error(error);
    }
  }
}
