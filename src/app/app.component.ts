import { Component, OnInit } from '@angular/core';
import { AppControlService } from './services/app-control.service';
import { CommunicationService } from './services/communication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showSevereErrorPage: boolean = false;

  constructor(
    public appControlService: AppControlService,
    private commService: CommunicationService
  ) {
    // this.commService.checkPing();
  }

  ngOnInit(): void {
    this.commService.callbacksObservable.subscribe((callbackData: any) => {
      switch (callbackData.callbackEvent) {
        case 'severe_error': {
          this.handleSevereError();
          break;
        }
      }
    });
  }

  handleSevereError(): void {
    try {
      this.showSevereErrorPage = true;
    } catch (error) {
      console.error(error)
    }
  }
}
