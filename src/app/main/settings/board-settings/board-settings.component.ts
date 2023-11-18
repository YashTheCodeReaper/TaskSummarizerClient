import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-board-settings',
  templateUrl: './board-settings.component.html',
  styleUrls: ['./board-settings.component.scss'],
})
export class BoardSettingsComponent {
  currentBoardSetting = {
    isPrivateBoard: true,
    enableTimeTracking: false,
    enableExport: true,
    boardName: 'Yashwanth Board',
    boardDescription:
      'This is a sample board description. This board is set to private so I only can access it.',
    defaultClockIn: '10:00',
    defaultClockOut: '19:00',
    breaks: [
      {
        start: '13:00',
        end: '14:00',
      },
    ],
    trackables: ['Atlassian JIRA', 'Microsoft Teams'],
  };
  boardInfoFormGroup!: FormGroup;
  boardDefaultTimeConstrains!: FormGroup;
  trackables: {
    image: string;
    name: string;
    description: string;
    status: boolean;
  }[] = [];

  constructor() {
    this.boardInfoFormGroup = new FormGroup({
      name: new FormControl(this.currentBoardSetting.boardName, [
        Validators.required,
      ]),
      description: new FormControl(this.currentBoardSetting.boardDescription, [
        Validators.required,
      ]),
    });

    this.boardDefaultTimeConstrains = new FormGroup({
      defaultClockIn: new FormControl(
        this.currentBoardSetting.defaultClockIn,
        Validators.required
      ),
      defaultClockOut: new FormControl(
        this.currentBoardSetting.defaultClockOut,
        Validators.required
      ),
    });
    this.currentBoardSetting.breaks.forEach((breakTime, index) => {
      this.boardDefaultTimeConstrains.addControl(
        `break-time-in-${index}`,
        new FormControl(
          this.currentBoardSetting.breaks[index].start,
          Validators.required
        )
      );
      this.boardDefaultTimeConstrains.addControl(
        `break-time-out-${index}`,
        new FormControl(
          this.currentBoardSetting.breaks[index].end,
          Validators.required
        )
      );
    });

    this.trackables = [
      {
        image: 'assets/images/common/jira.svg',
        name: 'Atlassian JIRA',
        description: 'Actively track jira tasks!',
        status: this.currentBoardSetting.trackables.includes('Atlassian JIRA'),
      },
      {
        image: 'assets/images/common/msteams.svg',
        name: 'Microsoft Teams',
        description: 'Track MS teams call activities!',
        status: this.currentBoardSetting.trackables.includes('Microsoft Teams'),
      },
      {
        image: 'assets/images/common/gitlab.svg',
        name: 'Gitlab',
        description: 'Track activities in gitlab',
        status: this.currentBoardSetting.trackables.includes('Gitlab'),
      },
    ];
  }

  onFieldFocus(fieldIndex: number): void {
    try {
      document
        .querySelector(`.input-group-bos1-${fieldIndex}`)
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

  onTrackableCheck(index: number): void {
    try {
      this.trackables[index].status = !this.trackables[index].status;
    } catch (error) {
      console.error(error);
    }
  }
}
