import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppControlService } from 'src/app/services/app-control.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { DataService } from 'src/app/services/data.service';

declare var TsSdk: any;

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss'],
})
export class NewBoardComponent {
  stages: { icon: string; name: string; description: string }[] = [];
  trackables: {
    image: string;
    name: string;
    description: string;
    status: 'active' | 'inactive';
  }[] = [];
  currentStage: number = 0;
  createBoardFormGroup!: FormGroup;
  maxContainerIndex = 4;
  @ViewChild('cbe2') cbe2El!: ElementRef;
  enableTimeTracking: boolean = false;
  enableExport: boolean = true;
  isPrivateBoard: boolean = false;

  showTrackableInfo: boolean = false;
  showTimeTrackingInfo: boolean = false;
  showExportInfo: boolean = false;
  showPrivateBoardInfo: boolean = false;

  constructor(
    private appControlService: AppControlService,
    private dataService: DataService,
    private commService: CommunicationService,
    private _snackBar: MatSnackBar
  ) {
    this.stages = [
      {
        icon: 'fi-sr-layer-plus',
        name: 'Create board',
        description: 'Give it a name and description',
      },
      {
        icon: 'fi-sr-settings-sliders',
        name: 'Select trackers',
        description: 'Adjust what to be tracked here',
      },
      {
        icon: 'fi-sr-binoculars',
        name: 'Add security',
        description: 'Who can access and what can be tracked',
      },
      {
        icon: 'fi-sr-check-circle',
        name: 'Summarize details',
        description: 'All ready! Good to go...',
      },
    ];

    this.trackables = [
      {
        image: 'assets/images/common/jira.svg',
        name: 'Atlassian JIRA',
        description: 'Actively track jira tasks!',
        status: 'active',
      },
      {
        image: 'assets/images/common/msteams.svg',
        name: 'Microsoft Teams',
        description: 'Track MS teams call activities!',
        status: 'inactive',
      },
      {
        image: 'assets/images/common/gitlab.svg',
        name: 'Gitlab',
        description: 'Track activities in gitlab',
        status: 'inactive',
      },
    ];

    this.commService.callbacksObservable.subscribe((callbackObj: any) => {
      switch (callbackObj.callbackEvent) {
        case 'board_created': {
          this._snackBar.open(callbackObj.callbackData.message, 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
          });
          this.appControlService.showNewBoard = false;
          break;
        }
      }
    });

    this.createBoardFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  onFieldFocus(fieldIndex: number): void {
    try {
      document
        .querySelector(`.input-group-cb1-${fieldIndex}`)
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
      this.trackables[index].status =
        this.trackables[index].status == 'active' ? 'inactive' : 'active';
    } catch (error) {
      console.error(error);
    }
  }

  getButtonStatus(): boolean | any {
    try {
      let isValid: boolean = false;
      switch (this.currentStage) {
        case 0:
          isValid = this.createBoardFormGroup.valid;
          break;
        case 1:
          isValid = this.trackables.some(
            (trackable) => trackable.status == 'active'
          );
          break;
        default:
          isValid = true;
      }
      return isValid;
    } catch (error) {
      console.error(error);
    }
  }

  onProceed(direction: string) {
    try {
      if (this.currentStage == 3) {
        let boardObj = { ...this.createBoardFormGroup.value };
        boardObj.userId = this.dataService.userObj.user_id;
        boardObj.timeConstraints = {
          clockIn: '10:00 AM',
          clockOut: '07:00 PM',
          breakIn: '01:00 PM',
          breakOut: '02:00 PM',
        };
        boardObj.trackables = this.trackables
          .filter((trObj) => trObj.status == 'active')
          .map((trObj) => trObj.name);
        boardObj.accessibilityConstraints = {
          enableExorting: this.enableExport,
          enableTimeTracking: this.enableTimeTracking,
          isPrivate: this.isPrivateBoard,
        };
        TsSdk.createBoard(boardObj);
        return;
      }
      if (direction == 'fwd') {
        if (this.currentStage < this.maxContainerIndex) this.currentStage++;
      } else {
        if (this.currentStage > 0) this.currentStage--;
      }
      this.cbe2El.nativeElement.style.transform = `translateX(-${
        this.currentStage * 100
      }%)`;
    } catch (error) {
      console.error(error);
    }
  }

  getActiveTrackables(): any {
    try {
      return this.trackables.filter(
        (trackable) => trackable.status == 'active'
      );
    } catch (error) {
      console.error(error);
    }
  }

  onCloseAddTask(): void {
    try {
      this.appControlService.confirmDialog(
        'Are you sure want to cancel creating board?',
        (result: any) => {
          if (result) this.appControlService.showNewBoard = false;
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
