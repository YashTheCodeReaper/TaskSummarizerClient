import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppControlService } from 'src/app/services/app-control.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { DataService } from 'src/app/services/data.service';

declare var TsSdk: any;
declare var document: any;

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.scss'],
})
export class JoinTeamComponent implements OnInit {
  showPassword: boolean = false;
  inviteId: string = '';
  inviteObject: any = {};
  password: string[] = ['', '', '', '', '', ''];
  showBoardSelection: boolean = false;
  linkBoardFormGroup!: FormGroup;
  showBoardsFlex: boolean = false;
  availableBoards: any[] = [];
  chosenBoard: any = {};

  constructor(
    public appControlService: AppControlService,
    private activatedRoute: ActivatedRoute,
    private commService: CommunicationService,
    private _snackBar: MatSnackBar,
    private dataService: DataService,
    private router: Router
  ) {
    this.linkBoardFormGroup = new FormGroup({
      boardToLink: new FormControl('', Validators.required),
    });

    this.activatedRoute.queryParams.subscribe((data: any) => {
      if (data?.invite) {
        this.inviteId = data.invite;
        this.onJoinInvite();
      }
    });

    this.commService.callbacksObservable.subscribe((callbackObj: any) => {
      switch (callbackObj.callbackEvent) {
        case 'fetched_invite': {
          this.inviteObject = callbackObj.callbackData.data[0];
          if (!this.inviteObject) {
            this._snackBar.open(
              'Invitation not found with the specified id',
              'OK',
              {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              }
            );
            this.appControlService.showJoinTeam = false;
            return;
          }
          if (
            this.dataService.userObj.teams.includes(this.inviteObject.team_id)
          ) {
            this._snackBar.open('You are already a part of this team!', 'OK', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.appControlService.showJoinTeam = false;
            return;
          }
          if (this.inviteObject.expiry) {
            let currentEpoch: any = new Date();
            currentEpoch = currentEpoch.getTime();

            if (currentEpoch >= Number(this.inviteObject.expiry)) {
              this.appControlService.confirmDialog(
                'Invite link expired',
                (result: any) => {
                  this.router.navigate(['/']);
                }
              );
              return;
            }
          }

          if (this.inviteObject.password) this.showPassword = true;
          // else TsSdk.joinTeam(this.inviteObject.team_id);
          break;
        }
        case 'invite_validated': {
          this.showBoardSelection = true;
          break;
        }
        case 'team_linked_to_board': {
          this._snackBar.open(callbackObj.callbackData.message, 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
          });
          this.appControlService.showJoinTeam = false;
          break;
        }
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.availableBoards = this.dataService.orgBoards.filter(
        (boardObj: any) => boardObj.accessibility_constraints.isPrivate == false
      );
    }, 500);
  }

  onJoinInvite(): void {
    try {
      if (!this.showPassword && !this.showBoardSelection)
        TsSdk.getInvite(undefined, this.inviteId);
      else if (this.showPassword && !this.showBoardSelection) {
        TsSdk.validateInvite({
          password: this.password.join(''),
          hashedPassword: this.inviteObject.password,
        });
      } else {
        let linkTeamObj = {
          boardId: this.chosenBoard.board_id,
          teamToLink: this.inviteObject.team_id,
        };

        TsSdk.addLinkedTeam(linkTeamObj);
        TsSdk.joinTeam(this.inviteObject.team_id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  onFocusNext(pIndex: number): void {
    try {
      document.querySelector(`.spinp-${pIndex}`).select();
      document.querySelector(`.spinp-${pIndex}`).focus();
    } catch (error) {
      console.error(error);
    }
  }

  onFieldFocus(): void {
    try {
      this.showBoardsFlex = true;
      document
        .querySelector(`.input-group-jot1`)
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
            this.linkBoardFormGroup.controls['boardToLink'].value
              .replaceAll(' ', '')
              .toLowerCase()
          )
      );
    } catch (error) {
      console.error();
    }
  }

  onChooseBoard(chosenBoard: any, event: any): void {
    try {
      this.chosenBoard = chosenBoard;
      this.linkBoardFormGroup.controls['boardToLink'].setValue(
        this.chosenBoard.name
      );
      this.showBoardsFlex = false;
      event.stopPropagation();
    } catch (error) {
      console.error(error);
    }
  }
}
