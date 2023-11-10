import { Component } from '@angular/core';
import { AppControlService } from 'src/app/services/app-control.service';

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.scss']
})
export class JoinTeamComponent {
  showPassword: boolean = false;

  constructor(public appControlService: AppControlService){}
}
