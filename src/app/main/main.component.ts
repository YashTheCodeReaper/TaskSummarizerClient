import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppControlService } from '../services/app-control.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private appControlService: AppControlService
  ) {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      if (data?.invite) this.appControlService.showJoinTeam = true;
    });
  }
}
