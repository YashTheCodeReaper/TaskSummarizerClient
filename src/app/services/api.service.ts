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

    this.dataService.configAddedObservable.subscribe((config: ApplicationConfiguration) => {
      this.appConfig = this.dataService.getConfig();
      this.constructedBaseUrl = `${this.appConfig.baseApiUrl}${this.appConfig.apiVersionUrl}`;
      this.apiRouters = this.appConfig.apiRouters;

      setTimeout(() => {
        this.createUser({username: 'jonsnow', password: 'Ya01022000#'});
      }, 5000);
    })
  }

  /**
   * Method to create a new user
   * @param routerKey Api router call key
   * @param bodyData Request body
   * @returns Api response
   */
  createUser(bodyData: {
    username: string;
    password: string;
  }): Observable<any> | void {
    try {
      return this.http.post(
        `${this.constructedBaseUrl}${this.apiRouters.registerUser}`,
        bodyData
      );
    } catch (error) {
      console.error(error);
    }
  }
}
