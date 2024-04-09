import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, ReplaySubject, Subject } from 'rxjs';

declare var TsSdk: any;
@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private callbacks = new Subject<any>();
  callbacksObservable: Observable<any> = this.callbacks.asObservable();

  constructor(private cookieService: CookieService) {
    this.initializeSdk();
    this.registerCallbacks();
  }

  initializeSdk(): void {
    try {
      TsSdk.Initialize({
        serverUrl1: 'http://localhost:3000/tetherfi/tsum/api/v1/',
        apiKey: '1122',
        apiToken: this.cookieService.get('jwt'),
      });
    } catch (error) {
      console.error(error);
    }
  }

  checkPing(): void {
    try {
      TsSdk.CheckServerPing();
    } catch (error) {
      console.error(error);
    }
  }

  registerCallbacks(): void {
    try {
      TsSdk.On('ERROR', (data: any) => {
        this.callbacks.next({ callbackEvent: 'error', callbackData: data });
      });
      TsSdk.On('SEVERE_ERROR', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'severe_error',
          callbackData: data,
        });
      });
      TsSdk.On('API_ERROR', (data: any) => {
        this.callbacks.next({ callbackEvent: 'api_error', callbackData: data });
      });
      TsSdk.On('REGISTERED_USER', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'registered_user',
          callbackData: data,
        });
      });
      TsSdk.On('LOGGED_IN_USER', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'logged_in_user',
          callbackData: data,
        });
      });
      TsSdk.On('FETCHED_JIRA_HISTORY', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'fetched_jira_history',
          callbackData: data,
        });
      });
      TsSdk.On('ONBOARDING_UPDATED', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'onboarding_updated',
          callbackData: data,
        });
      });
      TsSdk.On('BOARD_CREATED', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'board_created',
          callbackData: data,
        });
      });
      TsSdk.On('BOARDS_FETCHED', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'boards_fetched',
          callbackData: data,
        });
      });
      TsSdk.On('TEAM_CREATED', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'team_created',
          callbackData: data,
        });
      });
      TsSdk.On('YOUR_TEAM_FETCHED', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'your_team_fetched',
          callbackData: data,
        });
      });
      TsSdk.On('TEAM_LINKED_TO_BOARD', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'team_linked_to_board',
          callbackData: data,
        });
      });
      TsSdk.On('ALL_TEAMS_FETCHED', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'all_teams_fetched',
          callbackData: data,
        });
      });
      TsSdk.On('INVITE_CREATED', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'invite_created',
          callbackData: data,
        });
      });
      TsSdk.On('FETCHED_INVITE', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'fetched_invite',
          callbackData: data,
        });
      });
      TsSdk.On('DELETED_INVITE', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'deleted_invite',
          callbackData: data,
        });
      });
      TsSdk.On('FETCHED_TEAM_MEMBERS', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'fetched_team_members',
          callbackData: data,
        });
      });
      TsSdk.On('FETCHED_UNJOINED_TEAM_MEMBERS', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'fetched_unjoined_team_members',
          callbackData: data,
        });
      });
      TsSdk.On('CREATED_NOTIFICATION', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'created_notification',
          callbackData: data,
        });
      });
      TsSdk.On('FETCHED_NOTIFICATIONS', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'fetched_notifications',
          callbackData: data,
        });
      });
      TsSdk.On('CHANGED_ACTIVE_NOTIFICATION_STATUSES', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'changed_active_notification_statuses',
          callbackData: data,
        });
      });
      TsSdk.On('JOINED_TEAM', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'joined_team',
          callbackData: data,
        });
      });
      TsSdk.On('INVITE_VALIDATED', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'invite_validated',
          callbackData: data,
        });
      });
      TsSdk.On('FETCHED_OVERALL_JIRA_STATS', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'fetched_overall_jira_stats',
          callbackData: data,
        });
      });
      TsSdk.On('FETCHED_JIRA_PROJECT_KEY_MAPPER', (data: any) => {
        this.callbacks.next({
          callbackEvent: 'fetched_jira_project_key_mapper',
          callbackData: data,
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
}
