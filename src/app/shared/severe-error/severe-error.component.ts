import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-severe-error',
  templateUrl: './severe-error.component.html',
  styleUrls: ['./severe-error.component.scss']
})
export class SevereErrorComponent {
  severeErrorAnimation: AnimationOptions = {
    path: 'assets/images/common/severe_error.json',
    loop: true,
    autoplay: true,
  };
}
