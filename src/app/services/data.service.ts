import { ChangeDetectorRef, Injectable } from '@angular/core';
import { ApplicationConfiguration } from '../interfaces/app.config.interface';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommunicationService } from './communication.service';

declare var TsSdk: any;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private appConfig!: ApplicationConfiguration;
  private configAddedSubject = new ReplaySubject<ApplicationConfiguration>();
  configAddedObservable: Observable<ApplicationConfiguration> =
    this.configAddedSubject.asObservable();
  configUrl: string = 'assets/app.config.json';
  boards: any = [];
  teams: any = [];
  userObj: any = {};
  orgBoards: any[] = [];
  myInvolvedTeams: any[] = [];
  selectedBoard: any;
  teamMembers: any = {};
  myInvolvedUsers: any[] = [];
  notifications: any[] = [];

  constructor(
    private http: HttpClient,
    private commService: CommunicationService
  ) {
    this.commService.callbacksObservable.subscribe((callbackObj: any) => {
      switch (callbackObj.callbackEvent) {
        case 'boards_fetched': {
          this.boards = callbackObj.callbackData.data;
          console.log(this.boards);
          if (!this.boards.length) return;
          this.orgBoards = JSON.parse(
            JSON.stringify(callbackObj.callbackData.data)
          );
          this.flatenBoards();
          this.selectedBoard = this.boards[0];
          break;
        }
        case 'all_teams_fetched': {
          this.myInvolvedTeams = callbackObj.callbackData.data;
          console.log(this.myInvolvedTeams);
          this.myInvolvedTeams.forEach((teamObj: any) => {
            TsSdk.getTeamMembers(teamObj.team_id);
          });
          break;
        }
        case 'fetched_team_members': {
          callbackObj.callbackData.data.forEach((userObj: any) => {
            const userAlreadyExists = this.myInvolvedUsers.findIndex(
              (userObj1: any) => userObj.user_id == userObj1.user_id
            );
            if (userAlreadyExists < 0) this.myInvolvedUsers.push(userObj);
          });
          break;
        }
        case 'fetched_notifications': {
          this.notifications = callbackObj.callbackData.data;
          break;
        }
        case 'changed_active_notification_statuses': {
          TsSdk.getAllNotifications();
          break;
        }
      }
    });
  }

  flatenBoards(): void {
    try {
      let modifiedBoardObj: any[] = [];
      this.boards.forEach((boardObj: any) => {
        if (boardObj.linked_teams && boardObj.linked_teams.length) {
          boardObj.linked_teams.forEach((teamId: string) => {
            modifiedBoardObj.push({
              ...boardObj,
              isActive: false,
              linked_team: teamId,
            });
          });
        } else
          modifiedBoardObj.push({
            ...boardObj,
            isActive: false,
            linked_team: '',
          });
        delete boardObj.linked_teams;
      });
      this.boards = modifiedBoardObj;
      console.log(this.boards);
      this.boards[0].isActive = true;
    } catch (error) {
      console.error(error);
    }
  }

  fetchConfig(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.get(this.configUrl).subscribe(
        (data: ApplicationConfiguration | any) => {
          this.setConfig(data);
          setTimeout(() => {
            resolve(true);
          });
        },
        (error) => {
          reject(false);
        }
      );
    });
  }

  setConfig(config: ApplicationConfiguration) {
    try {
      this.appConfig = config;
      console.log('Successfully has set app.config data', this.appConfig);
      this.configAddedSubject.next(this.appConfig);
    } catch (error) {
      console.error(error);
    }
  }

  getConfig(): ApplicationConfiguration | any {
    try {
      return this.appConfig;
    } catch (error) {
      console.error(error);
    }
  }

  getTeamInfo(teamId: string): any {
    try {
      return this.myInvolvedTeams.find(
        (teamObj: any) => teamObj.team_id == teamId
      );
    } catch (error) {
      console.error(error);
    }
  }

  checkPendingNotifications(): boolean | any {
    try {
      return this.notifications.some(
        (notificationObject: any) => notificationObject.is_active == '1'
      );
    } catch (error) {
      console.error(error);
    }
  }
}
