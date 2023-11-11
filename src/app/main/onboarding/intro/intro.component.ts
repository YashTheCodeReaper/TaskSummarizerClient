import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { AppControlService } from 'src/app/services/app-control.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
  currIndex: number = 0;
  introObData: { heading: string }[] = [
    {
      heading: 'Welcome aboard! Lets goo..!',
    },
    {
      heading: 'All in one place to manage tasks!',
    },
    {
      heading: 'Colaborate with your team members!',
    },
    {
      heading: 'And much more...!',
    },
  ];
  @ViewChild('iobsw') iobswEl!: ElementRef;
  @Output() onBoardingCompleted = new EventEmitter<any>();

  constructor(public appControlService: AppControlService) {}

  onNavigate() {
    try {
      if (this.currIndex + 1 == this.introObData.length) this.onBoardingCompleted.emit();
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
