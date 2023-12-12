import { Component } from '@angular/core';
import { AppControlService } from 'src/app/services/app-control.service';

@Component({
  selector: 'app-japt-guide',
  templateUrl: './japt-guide.component.html',
  styleUrls: ['./japt-guide.component.scss']
})
export class JaptGuideComponent {
  currentStage: number = 1;

  constructor(public appControlService: AppControlService){}

  onStageChange(direction: string): void {
    try {
      if(direction == 'left') {
        if(this.currentStage > 1) this.currentStage--;
        else this.currentStage = 6;
      } else {
        if(this.currentStage < 6) this.currentStage++;
        else this.currentStage = 1;
      }
    } catch (error) {
      console.error(error)
    }
  }
}
