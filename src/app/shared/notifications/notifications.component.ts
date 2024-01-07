import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppControlService } from 'src/app/services/app-control.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  constructor(
    public appControlService: AppControlService,
    public dataService: DataService,
    private commService: CommunicationService,
    private _snackBar: MatSnackBar
  ) {
    this.commService.callbacksObservable.subscribe((callbackObj: any) => {
      switch (callbackObj.callbackEvent) {
        case 'joined_team': {
          this._snackBar.open(callbackObj.callbackData.message, 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
          });
          this.appControlService.showNotifications = false;
          break;
        }
      }
    });
  }
}
