import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppControlService {
  showAppShare: boolean = false;
  showJoinTeam: boolean = false;
  showOnboarding: boolean = false;
  showNewBoard: boolean = false;
  showMemberSwitch: boolean = false;
  showTaskExporter: boolean = false;

  constructor() { }
}
