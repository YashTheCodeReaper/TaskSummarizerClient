import { Injectable } from '@angular/core';
import { ApplicationConfiguration } from '../interfaces/app.config.interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private appConfig!: ApplicationConfiguration;
  private configAddedSubject = new Subject<ApplicationConfiguration>();

  configAddedObservable: Observable<ApplicationConfiguration> = this.configAddedSubject.asObservable();

  constructor() {}

  setConfig(config: ApplicationConfiguration) {
    try {
      this.appConfig = config;
      console.log('Successfully has set app.config data', this.appConfig);
      this.configAddedSubject.next(this.appConfig)
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
