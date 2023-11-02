import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { catchError, forkJoin, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  configUrl: string = 'assets/app.config.json';

  constructor(private dataService: DataService, private http: HttpClient) {}

  loadConfig = forkJoin([
    this.http.get(this.configUrl).pipe(retry(3), catchError(this.handleError)),
  ]);

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  ngOnInit(): void {
    this.loadConfig.subscribe((configData: any) => {
      this.dataService.setConfig(configData[0]);
    });
  }
}
