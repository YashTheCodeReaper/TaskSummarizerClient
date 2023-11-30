import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

declare var TsSDK: any;

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private callbacks = new ReplaySubject<any>(1);
  callbacksObservable: Observable<any> = this.callbacks.asObservable();

  constructor() {
    TsSDK.init({
      apiUrl: 'https://api.example.com',
      apiKey: 'asd',
      applicationBearerToken: 'sdfsdf',
    });

    this.registerCallbacks();
  }

  checkPing(): void {
    try {
      TsSDK.checkPing();
    } catch (error) {
      console.error(error);
    }
  }

  registerCallbacks(): void {
    try {
      TsSDK.on('ERROR', (data: any) => {
        this.callbacks.next({ callbackEvent: 'error', callbackData: data });
      });
      TsSDK.on('SEVERE_ERROR', (data: any) => {
        this.callbacks.next({ callbackEvent: 'severe_error', callbackData: data });
      });
    } catch (error) {
      console.error(error);
    }
  }
}
