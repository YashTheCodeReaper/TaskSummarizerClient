import { Injectable } from '@angular/core';
import { ApplicationConfiguration } from '../interfaces/app.config.interface';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private appConfig!: ApplicationConfiguration;
  private configAddedSubject = new ReplaySubject<ApplicationConfiguration>();
  configAddedObservable: Observable<ApplicationConfiguration> =
    this.configAddedSubject.asObservable();
  configUrl: string = 'assets/app.config.json';
  boards = [];

  constructor(private http: HttpClient) {}

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
