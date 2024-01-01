import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppControlService } from 'src/app/services/app-control.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { DataService } from 'src/app/services/data.service';

declare var TsSdk: any;

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss'],
})
export class NewTeamComponent implements OnInit {
  userObj: any;
  stages: any[] = [];
  currentStage: number = 0;
  teamInfoFormGroup!: FormGroup;
  accessibilityInfoFormGroup!: FormGroup;
  imageDataUrl: any = '';
  maxContainerIndex = 4;
  @ViewChild('nte2') nte2El!: ElementRef;
  analyticConsented: boolean = true;
  showBoardsFlex: boolean = false;
  availableBoards: any[] = [];
  chosenBoard: any;
  showAnalyticConcentInfo: boolean = false;
  showAccessibilityInfo: boolean = false;

  constructor(
    public dataService: DataService,
    private commService: CommunicationService,
    private _snackBar: MatSnackBar,
    private appControlService: AppControlService
  ) {
    this.userObj = this.dataService.userObj;

    this.stages = [
      {
        icon: 'fi-sr-volleyball',
        name: 'Create team',
        description: 'Give it a name, description and a picture',
      },
      {
        icon: 'fi-sr-chart-pie-alt',
        name: 'Team analytics',
        description: 'Consent for team analytics',
      },
      {
        icon: 'fi-sr-link-alt',
        name: 'Accessibility',
        description: 'Link your board and choose accessibility',
      },
      {
        icon: 'fi-sr-check-circle',
        name: 'Summarize details',
        description: 'All ready! Good to go...',
      },
    ];

    this.teamInfoFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      profilePicture: new FormControl(''),
    });

    this.accessibilityInfoFormGroup = new FormGroup({
      linkedBoard: new FormControl('', [Validators.required]),
      anyoneCanInvite: new FormControl(true),
    });

    this.commService.callbacksObservable.subscribe((callbackObj: any) => {
      switch (callbackObj.callbackEvent) {
        case 'team_created': {
          TsSdk.getTeam();
          break;
        }
        case 'team_fetched': {
          let updatedLinkedTeams =
            this.dataService.orgBoards[
              this.dataService.orgBoards.findIndex(
                (boardObj: any) =>
                  boardObj.board_id == this.chosenBoard.board_id
              )
            ].linked_teams;

          if (!updatedLinkedTeams) updatedLinkedTeams = [];
          updatedLinkedTeams.push(callbackObj.callbackData.data[0].team_id);

          let updateLinkedTeamsObj = {
            boardId: this.chosenBoard.board_id,
            linkedTeams: updatedLinkedTeams,
          };

          TsSdk.updateLinkedTeams(updateLinkedTeamsObj);
          break;
        }
        case 'linked_teams_updated': {
          this._snackBar.open(callbackObj.callbackData.message, 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
          });
          this.appControlService.showNewTeam = false;
          break;
        }
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.availableBoards = this.dataService.boards.filter(
        (boardObj: any) => boardObj.accessibility_constraints.isPrivate == false
      );
    }, 500);
  }

  getMiniUserName(name: string): string | any {
    try {
      return name.split(' ').length > 1
        ? name.split(' ')[0][0] + name.split(' ')[1][0]
        : name.split(' ')[0][0] + name.split(' ')[0][1];
    } catch (error) {
      console.error(error);
    }
  }

  closeNewTeam(): void {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  getButtonStatus(): boolean | any {
    try {
      let isValid: boolean = false;
      switch (this.currentStage) {
        case 0:
          isValid = this.teamInfoFormGroup.valid;
          break;
        case 2:
          isValid = this.accessibilityInfoFormGroup.valid && this.chosenBoard;
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
      if (this.currentStage == 3 && direction == 'fwd') {
        let teamObj = { ...this.teamInfoFormGroup.value };
        teamObj.constraints = {
          analyticsEnabled: this.analyticConsented,
          anyoneCanInvite:
            this.accessibilityInfoFormGroup.value.anyoneCanInvite,
        };
        TsSdk.createTeam(teamObj);
        return;
      }
      if (direction == 'fwd') {
        if (this.currentStage < this.maxContainerIndex) this.currentStage++;
      } else {
        if (this.currentStage > 0) this.currentStage--;
      }
      this.nte2El.nativeElement.style.transform = `translateX(-${
        this.currentStage * 100
      }%)`;
    } catch (error) {
      console.error(error);
    }
  }

  onFieldFocus(fieldIndex: number): void {
    try {
      if (fieldIndex == 2) this.showBoardsFlex = true;

      document
        .querySelector(`.input-group-nt1-${fieldIndex}`)
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

  onImageSelection(files: FileList | any): void {
    try {
      const file = files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const img: any = new Image();
          img.onload = () => {
            const aspectRatio = img.width / img.height;
            if (aspectRatio != 1) return;

            let newWidth, newHeight;
            if (aspectRatio > 1) {
              newWidth = 500;
              newHeight = 500 / aspectRatio;
            } else {
              newWidth = 500 * aspectRatio;
              newHeight = 500;
            }
            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx: any = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            this.imageDataUrl = canvas.toDataURL('image/png');
            this.teamInfoFormGroup.controls['profilePicture'].setValue(
              this.imageDataUrl
            );
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      const HTMLFileUploadElement: any =
        document.getElementById(`file-selector`);
      if (HTMLFileUploadElement) HTMLFileUploadElement.value = '';
    } catch (error) {
      console.error(error);
    }
  }

  onBoardsFlexOutsideClick(): void {
    try {
      this.showBoardsFlex = false;
    } catch (error) {
      console.error(error);
    }
  }

  filterObject(boardsArray: any[]): any[] | any {
    try {
      return boardsArray.filter((boardObj: any) =>
        boardObj.name
          .replaceAll(' ', '')
          .toLowerCase()
          .includes(
            this.accessibilityInfoFormGroup.controls['linkedBoard'].value
              .replaceAll(' ', '')
              .toLowerCase()
          )
      );
    } catch (error) {
      console.error();
    }
  }

  onChooseBoard(chosenBoard: any): void {
    try {
      this.chosenBoard = chosenBoard;
      this.accessibilityInfoFormGroup.controls['linkedBoard'].setValue(
        this.chosenBoard.name
      );
      this.showBoardsFlex = false;
    } catch (error) {
      console.error(error);
    }
  }
}
