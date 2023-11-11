import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppControlService } from 'src/app/services/app-control.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent {
  showProfileForm: boolean = false;
  showIntroOnboarding: boolean = true;

  constructor(public appControlService: AppControlService) {}
}
