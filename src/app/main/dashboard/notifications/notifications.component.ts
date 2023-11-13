import { Component } from '@angular/core';
import { AppControlService } from 'src/app/services/app-control.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  showOtherBoardsFlex: boolean = false;

  constructor(public appControlService: AppControlService){}
}
