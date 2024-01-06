import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppControlService } from 'src/app/services/app-control.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { DataService } from 'src/app/services/data.service';

declare var document: any;
declare var TsSdk: any;

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent {
  inviteMembers: boolean = false;
  isLinkGenerated: boolean = false;
  linkWithPassword: boolean = true;
  expireIn24Hours: boolean = true;
  password: string[] = ['', '', '', '', '', ''];
  inviteLink: string = '';
  teamMembers: any[] = [];
  searchQuote: string = '';
  showSearchFlex: boolean = false;
  unjoinedMembers: any[] = [];
  membersToBeInvited: any[] = [];
  inviteCompleted: number = 0;

  constructor(
    public appControlService: AppControlService,
    public dataService: DataService,
    private commService: CommunicationService,
    private _snackBar: MatSnackBar
  ) {
    TsSdk.getInvite(this.dataService.selectedBoard.linked_team);
    this.teamMembers = this.dataService.myInvolvedUsers.filter((userObj: any) =>
      JSON.stringify(userObj.teams).includes(
        this.dataService.selectedBoard.linked_team
      )
    );
    console.log(this.teamMembers);

    this.commService.callbacksObservable.subscribe((callbackObj: any) => {
      switch (callbackObj.callbackEvent) {
        case 'invite_created': {
          this._snackBar.open(callbackObj.callbackData.message, 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
          });
          TsSdk.getInvite(this.dataService.selectedBoard.linked_team);
          break;
        }
        case 'fetched_invite': {
          if (!callbackObj.callbackData.data.length) return;
          this.isLinkGenerated = true;
          this.inviteLink =
            window.location.origin +
            '/?invite=' +
            callbackObj.callbackData.data[0].invite_id;
          this.linkWithPassword = Boolean(this.password);
          break;
        }
        case 'deleted_invite': {
          this.isLinkGenerated = false;
          this.inviteLink = '';
          this.password = ['', '', '', '', '', ''];
          this.linkWithPassword = true;
          break;
        }
        case 'fetched_unjoined_team_members': {
          this.unjoinedMembers = callbackObj.callbackData.data;
          console.log(callbackObj.callbackData.data);
          break;
        }
        case 'created_notification': {
          this.inviteCompleted++;
          if (this.inviteCompleted == this.membersToBeInvited.length) {
            this._snackBar.open('Successfully invited all members', 'OK', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 5000,
            });
            this.appControlService.showAppShare = false;
          }
          break;
        }
      }
    });
  }

  onFocusNext(pIndex: number): void {
    try {
      document.querySelector(`.spinp-${pIndex}`).select();
      document.querySelector(`.spinp-${pIndex}`).focus();
    } catch (error) {
      console.error(error);
    }
  }

  getButtonValidation(): boolean | any {
    try {
      return this.linkWithPassword
        ? this.password.some((pwd: string) => pwd == '')
        : false;
    } catch (error) {
      console.error(error);
    }
  }

  generateInvite(): void {
    try {
      let inviteObj = {
        expireIn24Hours: this.expireIn24Hours,
        teamId: this.dataService.selectedBoard.linked_team,
        password: this.linkWithPassword ? this.password.join('') : '',
      };
      TsSdk.createInvite(inviteObj);
    } catch (error) {
      console.error(error);
    }
  }

  deleteInvite(): void {
    try {
      this.appControlService.confirmDialog(
        'Are you sure want to delete this invite?',
        (result: any) => {
          if (result) {
            TsSdk.deleteInvite(this.inviteLink.split('/?invite=')[1]);
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  copyInvite(): void {
    try {
      document.getElementById('linkInput').select();
      document.execCommand('copy');
      this._snackBar.open('Invite link copied', 'OK', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.appControlService.showAppShare = false;
    } catch (error) {
      console.error(error);
    }
  }

  onSearchFieldFocus(): void {
    try {
      this.showSearchFlex = true;
      if (this.searchQuote) this.filterUnjoinedMembers();
      else this.unjoinedMembers = [];
    } catch (error) {
      console.error(error);
    }
  }

  filterUnjoinedMembers(): void {
    try {
      this.unjoinedMembers = [];
      TsSdk.getUnjoinedMembers({
        teamId: this.dataService.selectedBoard.linked_team,
        searchQuote: this.searchQuote,
      });
    } catch (error) {
      console.error(error);
    }
  }

  addMemberToInvite(memberObj: any): void {
    try {
      const memberAlreadyInvited = this.membersToBeInvited.findIndex(
        (userObj: any) => userObj.user_id == memberObj.user_id
      );
      if (memberAlreadyInvited < 0) this.membersToBeInvited.push(memberObj);
    } catch (error) {
      console.error();
    }
  }

  onRemoveMember(index: number, event: any): void {
    try {
      this.membersToBeInvited.splice(index, 1);
      event.stopPropagation();
    } catch (error) {
      console.error();
    }
  }

  sendNotification(): void {
    try {
      this.membersToBeInvited.forEach((member: any) => {
        let notificationObj = {
          type: 'invite',
          userId: member.user_id,
          data: {
            invitedBy: this.dataService.userObj.name,
            teamObj: this.dataService.myInvolvedTeams.find(
              (teamObj: any) =>
                teamObj.team_id == this.dataService.selectedBoard.linked_team
            ),
          },
        };
        TsSdk.createNotification(notificationObj);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
