import { Component, OnInit } from '@angular/core';
import { AppControlService } from './services/app-control.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public appControlService: AppControlService) {}

  ngOnInit(): void {}
}
