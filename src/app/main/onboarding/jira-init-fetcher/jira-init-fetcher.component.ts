import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

declare var TsSdk: any;

@Component({
  selector: 'app-jira-init-fetcher',
  templateUrl: './jira-init-fetcher.component.html',
  styleUrls: ['./jira-init-fetcher.component.scss'],
})
export class JiraInitFetcherComponent implements OnInit {
  totalIssues: number = 0;
  foundIssues: number = 0;
  fetchedIssues: number = 0;
  showInitStat: boolean = true;
  currentIssueKey: string = '';
  dbInsertionStatus: number = 0;
  @Output() onJifCompleted = new EventEmitter<any>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    TsSdk.fetchJiraHistory({
      email: this.dataService.userObj.jira.email,
      apiToken: this.dataService.userObj.jira.apiToken,
    });

    setTimeout(() => {
      const socket = new WebSocket('ws://localhost:7071');

      socket.addEventListener('open', (event: any) => {
        console.log('Connection opened');
      });

      socket.addEventListener('message', (event: any) => {
        if (
          JSON.parse(event.data)?.userEmail !=
          this.dataService.userObj.jira.email
        )
          return;
        if (JSON.parse(event.data)?.totalIssues) {
          this.totalIssues = JSON.parse(event.data).totalIssues;
          this.foundIssues = JSON.parse(event.data).foundIssues;
          if (this.totalIssues == this.foundIssues) this.showInitStat = false;
          return;
        }
        if (JSON.parse(event.data)?.fetchedIssueKey) {
          this.currentIssueKey = JSON.parse(event.data)?.fetchedIssueKey;
          this.fetchedIssues++;
          return;
        }
        if (JSON.parse(event.data)?.onDbProgress) {
          this.dbInsertionStatus = 1;
        }
        if (JSON.parse(event.data)?.onDbProgressCompleted) {
          setTimeout(() => {
            this.dbInsertionStatus = 2;
            return;
          }, 2000);
        }
        if (JSON.parse(event.data)?.fetchCompleted) {
          socket.close();
          this.dbInsertionStatus = 3;
          setTimeout(() => {
            this.onJifCompleted.emit();
            return;
          }, 3000);
        }
      });
    }, 500);
  }
}
