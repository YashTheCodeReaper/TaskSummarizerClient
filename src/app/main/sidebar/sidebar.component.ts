import { Component } from '@angular/core';
import { AppControlService } from 'src/app/services/app-control.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  userObj: any;

  constructor(
    public appControlService: AppControlService,
    public dataService: DataService
  ) {
    this.userObj = this.dataService.userObj;
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

  getTeamInfo(teamId: string): any {
    try {
      return this.dataService.myInvolvedTeams.find(
        (teamObj: any) => teamObj.team_id == teamId
      );
    } catch (error) {
      console.error(error);
    }
  }
}
