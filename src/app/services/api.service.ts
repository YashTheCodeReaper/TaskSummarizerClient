import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import {
  ApiRouters,
  ApplicationConfiguration,
} from '../interfaces/app.config.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructedBaseUrl: string = '';
  appConfig!: ApplicationConfiguration;
  apiRouters!: ApiRouters;

  constructor(private dataService: DataService, private http: HttpClient) {
    this.dataService.configAddedObservable.subscribe(
      (config: ApplicationConfiguration) => {
        this.appConfig = this.dataService.getConfig();
        this.constructedBaseUrl = `${this.appConfig.baseApiUrl}${this.appConfig.nodeApiVersionUrl}`;
        this.apiRouters = this.appConfig.apiRouters;
      }
    );
  }

  requestZohoOauthUrl(): Observable<any> | any {
    try {
      return this.http.get(
        `${this.constructedBaseUrl}${this.apiRouters.requestZohoOauthUrl}`
      );
    } catch (error) {
      console.error(error);
    }
  }

  getZohoAccessToken(authCode: string): Observable<any> | any {
    try {
      return this.http.post(
        `${this.constructedBaseUrl}${this.apiRouters.getZohoAccessToken}`,
        { code: authCode }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
