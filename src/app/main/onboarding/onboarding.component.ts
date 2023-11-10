import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppControlService } from 'src/app/services/app-control.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent {
  lottieConfig: AnimationOptions[] = [
    {
      path: 'assets/images/main/onboarding/iobd-1.json',
      loop: true,
      autoplay: true,
    },
    {
      path: 'assets/images/main/onboarding/iobd-2.json',
      loop: true,
      autoplay: true,
    },
    {
      path: 'assets/images/main/onboarding/iobd-3.json',
      loop: true,
      autoplay: true,
    },
    {
      path: 'assets/images/main/onboarding/iobd-4.json',
      loop: true,
      autoplay: true,
    },
  ];
  introObData: { heading: string; description: string }[] = [];
  @ViewChild('iobsw') iobswEl!: ElementRef;
  currIndex: number = 0;

  constructor(public appControlService: AppControlService) {
    this.introObData = [
      {
        heading: 'Welcome aboard!',
        description:
          'Let me introduce to a new, efficient and beautiful way to manage your tasks, and which of-course is highly automated!',
      },
      {
        heading: 'All in one place!',
        description:
          'Manage your task, colaborate and inspect your team members task, track your performance and more..!',
      },
      {
        heading: 'Highly automated!',
        description:
          'Why do manual task tracking while we automate your work logs? Powerful JIRA integration made it possible!',
      },
      {
        heading: 'And much more...!',
        description:
          'Get excited to explore other features too! Alright...Lets setup your profile!',
      },
    ];
  }

  onNavigate() {
    try {
      if (this.currIndex + 1 == this.introObData.length)
        this.appControlService.showIntroOnboarding = false;
      if (this.currIndex < this.introObData.length) {
        this.currIndex++;
      }
      this.iobswEl.nativeElement.style.transform = `translateX(-${
        this.currIndex * 100
      }%)`;
    } catch (error) {
      console.error(error);
    }
  }
}
