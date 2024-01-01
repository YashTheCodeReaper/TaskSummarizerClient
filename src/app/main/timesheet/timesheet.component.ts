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
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
  currentStage: number = 0;
  fromDate: Date = new Date();
  toDate: Date = new Date();
  today: Date = new Date();
  datesArray: Date[] = [];
  selectedDate!: Date;
  @ViewChild('datePicker1') datePicker1El!: ElementRef;
  @ViewChild('datePicker2') datePicker2El!: ElementRef;
  timesheetData = [
    {
      date: '20/11/2023',
      bin: [],
      active: [
        {
          zohoProjectId: 123123123,
          zohoProjectName: 'IIT_Compilers_Clan',
          zohoProjectTaskId: 1231231,
          zohoProjectTaskName: 'Product issue fixing and troubleshooting',
          workHours: '02:30',
          tasks: [
            {
              taskId: 'PRODQA-3523',
              taskType: 'jira',
              project: 'Product QA',
              isApproved: false,
              taskname: 'Visual IVR AV Call Revamp',
            },
            {
              taskId: 'ENGQA-2235',
              taskType: 'jira',
              project: 'Engineering QA',
              isApproved: false,
              taskname:
                'Mutimedia Attachment Dialog Issue Fixes and Video Call Revamp Testing',
            },
            {
              taskId: 'PQ-252',
              taskType: 'jira',
              project: 'Project QA',
              isApproved: false,
              taskname: 'Visual IVR Announcement Node Spacing Issue',
            },
            {
              taskId: 'PB-1232',
              taskType: 'jira',
              project: 'Product Backlog',
              isApproved: false,
              taskname:
                'Visual IVR Jasmine Testing Framework Unit Testing Implementation',
            },
          ],
        },
        {
          zohoProjectId: 123123123,
          zohoProjectName: 'Adani_Support_Tickets',
          zohoProjectTaskId: 1231231,
          zohoProjectTaskName: 'Release and Deployment Activities',
          workHours: '03:30',
          tasks: [
            {
              taskId: 'GTLTAG-0134',
              taskType: 'gitlab',
              project: '',
              isApproved: false,
              taskname: 'Visual IVR Patch Version 1.3.5.30-patch.1 Release',
            },
            {
              taskId: 'GTLTAG-0135',
              taskType: 'gitlab',
              project: '',
              isApproved: false,
              taskname: 'Visual IVR Beta Version 1.4.0-beta.2 Release',
            },
          ],
        },
        {
          zohoProjectId: 123123123,
          zohoProjectName: 'CAG_Visual_IVR',
          zohoProjectTaskId: 1231231,
          zohoProjectTaskName: 'Internal / Technical Meetings and Discussions',
          workHours: '01:30',
          tasks: [
            {
              taskId: 'MSTCALL-0025',
              taskType: 'msteams',
              project: '',
              isApproved: false,
              taskname:
                'Changi Airport Group Visual IVR Design Changes Discussion',
            },
            {
              taskId: 'MSTCALL-0078',
              taskType: 'msteams',
              project: '',
              isApproved: false,
              taskname: 'Visual IVR QA Issue Discussions',
            },
          ],
        },
      ],
    },
  ];
  availableZohoData = [
    {
      zohoProjectId: 12312312,
      zohoProjectName: 'II_TTF_Compilers_Clan',
      zohoTasks: [
        {
          zohoTaskId: 1212341234,
          zohoTaskName: 'Product issue fixing and troubleshooting',
        },
        {
          zohoTaskId: 1212341234,
          zohoTaskName: 'Project issue fixing and troubleshooting',
        },
        {
          zohoTaskId: 1212341234,
          zohoTaskName: 'Tehchnical / internal meeting and discussions',
        },
        {
          zohoTaskId: 1212341234,
          zohoTaskName: 'Release and deployment activities',
        },
      ],
    },
    {
      zohoProjectId: 12312312,
      zohoProjectName: 'Tetherfi_General_Tracking_Activities',
      zohoTasks: [
        {
          zohoTaskId: 1212341234,
          zohoTaskName: 'Public Holiday',
        },
        {
          zohoTaskId: 1212341234,
          zohoTaskName: 'Creating proof of concepts',
        },
        {
          zohoTaskId: 1212341234,
          zohoTaskName: 'HR activities / Team non-technical activities',
        },
      ],
    },
  ];
  showZPorjectDropdown: boolean[] = [];
  showZTasksDropdown: boolean[] = [];

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
    this.setDateArray();
    this.setDropdownSwitchers();
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

  drop(event: any): void {
    try {
      console.log(event);
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  calculateWorkHours(workHoursArray: any) {
    const workMinutes = workHoursArray.reduce(
      (totalMinutes: any, entry: any) => {
        if (entry.workHours.length != 5 || !entry.workHours.includes(':'))
          entry.workHours = '00:00';
        const [hours, minutes] = entry.workHours.split(':').map(Number);
        return totalMinutes + hours * 60 + minutes;
      },
      0
    );
    const minimumWorkHours = 8 * 60;
    const workHoursLeft = Math.max(minimumWorkHours - workMinutes, 0);
    const percentageCompleted = Math.min(
      (workMinutes / minimumWorkHours) * 100,
      100
    );
    const additionalWorkHours = Math.max(workMinutes - minimumWorkHours, 0);

    return {
      workHoursLeft: this.formatTime(workHoursLeft),
      percentageCompleted: percentageCompleted.toFixed(1),
      additionalWorkHours: this.formatTime(additionalWorkHours),
    };
  }

  formatTime(minutes: any) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(
      remainingMinutes
    ).padStart(2, '0')}`;
  }

  setDateArray() {
    this.datesArray = [];
    let currentDate: Date = new Date(this.fromDate);

    while (currentDate <= this.toDate) {
      this.datesArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    this.selectedDate = this.datesArray[0];
  }

  setDropdownSwitchers() {
    this.showZPorjectDropdown = [false, false, false];
    this.showZTasksDropdown = [false, false, false];
  }
}
