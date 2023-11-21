import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-jira-settings',
  templateUrl: './jira-settings.component.html',
  styleUrls: ['./jira-settings.component.scss'],
})
export class JiraSettingsComponent {
  jiraAccountFormGroup!: FormGroup;
  currentProject: string = 'Product QA';
  availableBoards: { boardId: number; boardName: string }[] = [];
  availableStatuses: { projectName: string; statuses: string[] }[] = [];
  jiraData: any = {
    email: 'yashwanthkumar.arivazhagan@tetherfi.com',
    apiToken:
      'ef88d62a-14ae-4cfa-8850-9079d292e09d-ef88d62a-14ae-4cfa-8850-9079d292e09d',
    boardRestrictions: [],
    trackConstraints: [
      {
        project: 'Product QA',
        startStatuses: [],
        stopStatuses: [],
      },
    ],
  };
  showBoardsDisplayFlex: boolean = false;
  showStartStatuses: boolean = false;
  showStopStatuses: boolean = false;

  constructor() {
    this.availableStatuses = [
      {
        projectName: 'Product QA',
        statuses: [
          'New',
          'Assigned',
          'Reopen',
          'In Progress',
          'Fixed',
          'Unit Testing',
          'Cancelled',
          'Rejected',
          'Environment Issue',
        ],
      },
    ];
    this.availableBoards = [
      {
        boardId: 1,
        boardName: 'Super board',
      },
      {
        boardId: 1,
        boardName: 'Hover board',
      },
      {
        boardId: 1,
        boardName: 'Only JIRA board',
      },
    ];
    this.jiraAccountFormGroup = new FormGroup({
      email: new FormControl(this.jiraData.email, Validators.required),
      apiToken: new FormControl(this.jiraData.apiToken, Validators.required),
    });

    this.jiraAccountFormGroup.valueChanges.subscribe((valueChange) => {
      console.log(
        JSON.stringify(valueChange) ==
          JSON.stringify({
            email: this.jiraData.email,
            apiToken: this.jiraData.apiToken,
          })
      );
    });
  }

  onFieldFocus(fieldIndex: number): void {
    try {
      document
        .querySelector(`.input-group-jis1-${fieldIndex}`)
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

  checkRestriction(): boolean | any {
    try {
      return (
        this.jiraData.boardRestrictions.findIndex(
          (resObj: any) => resObj?.project == this.currentProject
        ) >= 0
      );
    } catch (error) {
      console.error(error);
    }
  }

  onVisibilityChange(): void {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  onAddBoard(boardObj: any): void {
    try {
      const isProjectConstraintsPresent =
        this.jiraData.boardRestrictions.findIndex(
          (boardRes: any) => boardRes?.project == this.currentProject
        );

      if (isProjectConstraintsPresent < 0) {
        this.jiraData.boardRestrictions.push({
          project: this.currentProject,
          boards: [boardObj],
        });
      } else {
        const projectIndex = this.jiraData.boardRestrictions.findIndex(
          (boardRes: any) => boardRes.project == this.currentProject
        );
        const isBoardAlreadyAvailable = this.jiraData.boardRestrictions[
          projectIndex
        ].boards.findIndex(
          (boardObj1: any) => boardObj1.boardName == boardObj.boardName
        );

        if (isBoardAlreadyAvailable < 0) {
          this.jiraData.boardRestrictions[projectIndex].boards.push(boardObj);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  onRemoveBoard(boardObj: any): void {
    const projectIndex = this.jiraData.boardRestrictions.findIndex(
      (boardRes: any) => boardRes.project == this.currentProject
    );
    if (this.jiraData.boardRestrictions[projectIndex].boards.length > 1) {
      const boardIndex = this.jiraData.boardRestrictions[
        projectIndex
      ].boards.findIndex(
        (boardObj1: any) => boardObj1.boardName == boardObj.boardName
      );

      this.jiraData.boardRestrictions[projectIndex].boards.splice(
        boardIndex,
        1
      );
    } else {
      this.jiraData.boardRestrictions.splice(projectIndex, 1);
    }
    try {
    } catch (error) {
      console.error(error);
    }
  }

  getAvailableStatusActiveIndex(): number | any {
    try {
      return this.availableStatuses.findIndex(
        (as) => as.projectName == this.currentProject
      );
    } catch (error) {
      console.error;
    }
  }

  onAddStatus(constraint: string, status: string): void {
    try {
      let isStatusAlreadyThere = this.jiraData.trackConstraints[
        this.getAvailableStatusActiveIndex()
      ][constraint].findIndex((status1: any) => status1 == status);

      if (isStatusAlreadyThere < 0) {
        isStatusAlreadyThere = this.jiraData.trackConstraints[
          this.getAvailableStatusActiveIndex()
        ][
          constraint == 'startStatuses' ? 'stopStatuses' : 'startStatuses'
        ].findIndex((status1: any) => status1 == status);
      }

      if (isStatusAlreadyThere < 0)
        this.jiraData.trackConstraints[this.getAvailableStatusActiveIndex()][
          constraint
        ].push(status);
    } catch (error) {
      console.error(error);
    }
  }

  onRemoveStatus(constraint: string, status: string): void {}
}
