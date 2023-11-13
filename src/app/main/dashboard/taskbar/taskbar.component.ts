import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss'],
})
export class TaskbarComponent {
  @Input() taskType!: string;
  @Input() taskTitle!: string;
  @Input() width!: number;
  @Input() priority!: string;
  @Input() priorityBg!: string;
  @Input() taskStartTime!: string;
  @Input() taskEndTime!: string;
  @Input() offset!: string;
}
