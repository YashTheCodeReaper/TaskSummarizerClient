import { Injectable } from '@angular/core';
import {
  NotilandComponent,
  NotilandModel,
} from '../shared/notiland/notiland.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AppControlService {
  showAppShare: boolean = false;
  showJoinTeam: boolean = false;
  showOnboarding: boolean = true;
  showNewBoard: boolean = false;
  showMemberSwitch: boolean = false;
  showTaskExporter: boolean = false;
  showNotifications: boolean = false;
  showAddTask: boolean = false;

  constructor(private dialog: MatDialog) {}

  confirmDialog(message: string, onClose: any): void {
    try {
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
}
