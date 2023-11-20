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
  jiraData: any = {
    email: 'yashwanthkumar.arivazhagan@tetherfi.com',
    apiToken:
      'ef88d62a-14ae-4cfa-8850-9079d292e09d-ef88d62a-14ae-4cfa-8850-9079d292e09d',
    boardRestrictions: [],
  };
  showBoardsDisplayFlex: boolean = false;

  constructor() {
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
}
