import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppControlService } from 'src/app/services/app-control.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  chosenOneAnimation: AnimationOptions = {
    path: 'assets/images/main/team/chosenone.json',
    loop: true,
    autoplay: true,
  };

  constructor(public appControlService: AppControlService) {}
}
