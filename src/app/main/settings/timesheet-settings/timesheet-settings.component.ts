import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-timesheet-settings',
  templateUrl: './timesheet-settings.component.html',
  styleUrls: ['./timesheet-settings.component.scss'],
})
export class TimesheetSettingsComponent {
  availableJiraProjects: { projectName: string }[] = [];
  availableZohoProjects: {
    projectName: string;
    tasks: { taskName: string }[];
  }[] = [];
  zohoData: any = {
    jira: [
      {
        projectName: 'Product QA',
        zohoProject: {
          projectName: '',
          taskName: '',
        },
      },
      {
        projectName: 'Engineering QA',
        zohoProject: {
          projectName: '',
          taskName: '',
        },
      },
      {
        projectName: 'Product Backlogs',
        zohoProject: {
          projectName: '',
          taskName: '',
        },
      },
      {
        projectName: 'Project QA',
        zohoProject: {
          projectName: '',
          taskName: '',
        },
      },
    ],
    teams: [],
    gitlab: [],
    leave: [],
    holiday: [],
    todoList: [],
  };
  dropdownFocuser = [false, false, false, false, false, false, false, false];

  constructor() {
    this.availableJiraProjects = [
      {
        projectName: 'Product QA',
      },
      {
        projectName: 'Engineering QA',
      },
      {
        projectName: 'Product Backlogs',
      },
      {
        projectName: 'Project QA',
      },
    ];
    this.availableZohoProjects = [
      {
        projectName: 'TTF_Compilers_Clan',
        tasks: [
          {
            taskName: 'Internal Meetings & Discussions',
          },
          {
            taskName: 'Product Issue Troubleshooting & Fixing',
          },
          {
            taskName: 'Project Issue Troubleshooting & Fixing',
          },
          {
            taskName: 'Technical/Internal Meetings & Discussions',
          },
          {
            taskName: 'Code Reviews',
          },
        ],
      },
      {
        projectName: 'Tetherfi_General_Tracking_Activities',
        tasks: [
          {
            taskName: 'Internal Meetings & Discussions',
          },
          {
            taskName: 'Product Issue Troubleshooting & Fixing',
          },
          {
            taskName: 'Project Issue Troubleshooting & Fixing',
          },
          {
            taskName: 'Technical/Internal Meetings & Discussions',
          },
          {
            taskName: 'Code Reviews',
          },
        ],
      },
      {
        projectName: 'IDFC_Visual_IVR_Tickets',
        tasks: [
          {
            taskName: 'Internal Meetings & Discussions',
          },
          {
            taskName: 'Product Issue Troubleshooting & Fixing',
          },
          {
            taskName: 'Project Issue Troubleshooting & Fixing',
          },
          {
            taskName: 'Technical/Internal Meetings & Discussions',
          },
          {
            taskName: 'Code Reviews',
          },
        ],
      },
    ];
  }

  onFieldFocus(grpName: string, fieldIndex: number): void {
    try {
      this.dropdownFocuser[fieldIndex] = true;
      document
        .querySelector(`.input-group-${grpName}-${fieldIndex}`)
        ?.classList.toggle('input-group-focus');
    } catch (error) {
      console.error(error);
    }
  }

  validateField(formGroup: any, fieldName: string) {
    return (
      (formGroup.controls[fieldName].touched &&
        formGroup.controls[fieldName].errors) ||
      (!formGroup.controls[fieldName].pristine &&
        formGroup.controls[fieldName].invalid)
    );
  }

  getJiraProjectIndexFromZohoData(projectName: string): number | any {
    try {
      return this.zohoData.jira.findIndex(
        (jiraData: any) => jiraData.projectName == projectName
      );
    } catch (error) {
      console.error;
    }
  }

  getZohoProjectIndex(projectName: string): number | any {
    try {
      return this.availableZohoProjects.findIndex(
        (zohoData: any) => zohoData.projectName == projectName
      );
    } catch (error) {
      console.error;
    }
  }

  onZohoProjectSelect(
    jiraIndex: number,
    projectName: string,
    hideIndex: number
  ): void {
    try {
      this.zohoData.jira[jiraIndex].zohoProject.projectName = projectName;
      this.dropdownFocuser[hideIndex] = false;
    } catch (error) {
      console.error(error);
    }
  }

  onZohoProjectTaskSelect(
    jiraIndex: number,
    taskName: string,
    hideIndex: number
  ): void {
    try {
      this.zohoData.jira[jiraIndex].zohoProject.taskName = taskName;
      this.dropdownFocuser[hideIndex] = false;
    } catch (error) {
      console.error(error);
    }
  }
}
