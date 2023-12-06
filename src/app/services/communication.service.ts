import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

declare var TsSdk: any;

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private callbacks = new ReplaySubject<any>(1);
  callbacksObservable: Observable<any> = this.callbacks.asObservable();

  constructor() {
    TsSdk.Initialize({
      serverUrl1: 'https://api.example.com',
      apiKey: '',
      apiToken: '',
    });

    this.registerCallbacks();
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
    } catch (error) {
      console.error(error);
    }
  }
}
