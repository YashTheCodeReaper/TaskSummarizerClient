import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    const timeFlexEl: any = document.querySelector('.time-block-flex');
    const taskSheetEl: any = document.querySelector('.task-sheet');

    timeFlexEl.addEventListener('scroll', function () {
      taskSheetEl.scrollTop = timeFlexEl.scrollTop;
    });

    taskSheetEl.addEventListener('scroll', function () {
      timeFlexEl.scrollTop = taskSheetEl.scrollTop;
    });
  }
}
