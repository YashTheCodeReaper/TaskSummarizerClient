import { Injectable } from '@angular/core';
import { ApplicationConfiguration } from '../interfaces/app.config.interface';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommunicationService } from './communication.service';

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
  myTeam: any;

  constructor(
    private http: HttpClient,
    private commService: CommunicationService
  ) {
    this.commService.callbacksObservable.subscribe((callbackObj: any) => {
      switch (callbackObj.callbackEvent) {
        case 'boards_fetched': {
          this.boards = callbackObj.callbackData.data;
          this.orgBoards = callbackObj.callbackData.data;
          this.flatenBoards();
          break;
        }
        case 'team_fetched': {
          this.myTeam = callbackObj.callbackData.data[0];
          break;
        }
      }
    });
  }

  flatenBoards(): void {
    try {
      this.boards.forEach((boardObj: any, index: number) => {
        if (boardObj?.linked_team || boardObj?.linked_team == '') return;
        if (boardObj.linked_teams.length == 0) {
          boardObj.linked_team = '';
        } else {
          let modifiedBoardObj: any = [];
          boardObj.linked_teams.forEach((teamId: string) => {
            modifiedBoardObj.push({ ...boardObj, linked_team: teamId });
          });
          modifiedBoardObj.forEach((mBoardObj: any) => {
            delete mBoardObj.linked_teams;
          });
          this.boards.splice(index, 1);
          this.boards.push(...modifiedBoardObj);
        }
        delete boardObj.linked_teams;
      });
      console.log(this.boards);
      this.boards.map((boardObj: any) => (boardObj.isActive = false));
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
}
