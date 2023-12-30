import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, ReplaySubject } from 'rxjs';

declare var TsSdk: any;
@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private callbacks = new ReplaySubject<any>(1);
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
    } catch (error) {
      console.error(error);
    }
  }
}
