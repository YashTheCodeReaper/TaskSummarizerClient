import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppControlService {
  showAppShare: boolean = false;
  showJoinTeam: boolean = false;
  showOnboarding: boolean = true;
  showIntroOnboarding: boolean = true;

  constructor() { }
}
