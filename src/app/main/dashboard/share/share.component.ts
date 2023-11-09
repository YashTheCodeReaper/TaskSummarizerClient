import { Component } from '@angular/core';
import { AppControlService } from 'src/app/services/app-control.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent {
  inviteMembers: boolean = false;
  isLinkGenerated: boolean = false;

  constructor(public appControlService: AppControlService){}
}
