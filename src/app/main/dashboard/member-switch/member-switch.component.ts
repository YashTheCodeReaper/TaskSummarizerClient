import { Component } from '@angular/core';
import { AppControlService } from 'src/app/services/app-control.service';

@Component({
  selector: 'app-member-switch',
  templateUrl: './member-switch.component.html',
  styleUrls: ['./member-switch.component.scss']
})
export class MemberSwitchComponent {
  membersArray: {name: string}[] = [];

  constructor(public appControlService: AppControlService){
    this.membersArray = [
      {name: 'Poornachandra M'},
      {name: 'Suraj Kumar'},
      {name: 'Bharish Alva'},
      {name: 'Kavana K'},
      {name: 'Chirag R'},
      {name: 'Jyothi GN'},
      {name: 'Varsha B'},
      {name: 'Rakesh Rai'},
    ]
  }
}
