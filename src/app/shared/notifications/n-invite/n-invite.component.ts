import { Component, Input } from '@angular/core';
import { AppControlService } from 'src/app/services/app-control.service';
import { DataService } from 'src/app/services/data.service';

declare var TsSdk: any;

@Component({
  selector: 'app-n-invite',
  templateUrl: './n-invite.component.html',
  styleUrls: ['./n-invite.component.scss'],
})
export class NInviteComponent {
  showOtherBoardsFlex: boolean = false;
  chosenBoard!: any;
  @Input('notification') notification: any;

  constructor(
    public appControlService: AppControlService,
    public dataService: DataService
  ) {
    this.chosenBoard = this.dataService.selectedBoard;
  }

  filterPublicBoards(): any[] | any {
    try {
      return this.dataService.orgBoards.filter(
        (boardObj: any) => !boardObj.accessibility_constraints.isPrivate
      );
    } catch (error) {
      console.error(error);
    }
  }

  onChooseBoard(board: any, event: any): void {
    try {
      this.chosenBoard = board;
      this.showOtherBoardsFlex = false;
      event.stopPropagation();
    } catch (error) {
      console.error(error);
    }
  }

  onJoinTeam(): void {
    try {
      let linkTeamObj = {
        boardId: this.chosenBoard.board_id,
        teamToLink: this.notification.data.teamObj.team_id,
      };

      TsSdk.addLinkedTeam(linkTeamObj);
      TsSdk.joinTeam(this.notification.data.teamObj.team_id);
      TsSdk.deleteNotification(this.notification.notification_id);
    } catch (error) {
      console.error(error);
    }
  }

  deleteNotification(): void {
    try {
      this.appControlService.confirmDialog(
        'Are you sure want to deny the invite?',
        (result: any) => {
          if (result)
            TsSdk.deleteNotification(this.notification.notification_id);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
