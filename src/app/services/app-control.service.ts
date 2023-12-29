import { Injectable } from '@angular/core';
import {
  NotilandComponent,
  NotilandModel,
} from '../shared/notiland/notiland.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AppControlService {
  showAppShare: boolean = false;
  showJoinTeam: boolean = false;
  showOnboarding: boolean = false;
  showNewBoard: boolean = false;
  showMemberSwitch: boolean = false;
  showTaskExporter: boolean = false;
  showNotifications: boolean = false;
  showAddTask: boolean = false;
  showJapiGuide: boolean = false;

  constructor(private dialog: MatDialog, private dataService: DataService) {
    this.validateOnboarding();
  }

  confirmDialog(message: string, onClose: any): void {
    try {
      this.dialog.closeAll();
      const dialogData = new NotilandModel(message);
      const dialogRef = this.dialog.open(NotilandComponent, {
        data: dialogData,
      });
      dialogRef.afterClosed().subscribe((dialogResult) => {
        onClose(dialogResult);
      });
    } catch (error) {
      console.error(error);
    }
  }

  validateOnboarding(): void {
    try {
      if (!Object.keys(this.dataService.userObj).length) return;
      Object.keys(this.dataService.userObj.onboarding)?.forEach((key) => {
        if (!this.dataService.userObj.onboarding[key])
          this.showOnboarding = true;
      });
    } catch (error) {
      console.error(error);
    }
  }
}
