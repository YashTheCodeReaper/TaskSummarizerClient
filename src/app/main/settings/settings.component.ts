import { Component, ViewEncapsulation } from '@angular/core';
import { AppControlService } from 'src/app/services/app-control.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent {
  constructor(public appControlService: AppControlService){}
}
