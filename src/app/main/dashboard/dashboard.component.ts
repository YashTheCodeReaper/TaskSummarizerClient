import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppControlService } from 'src/app/services/app-control.service';
import { DataService } from 'src/app/services/data.service';

declare var TsSdk: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  selectedMonth: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth()
  );
  dateArray: { originalDate: Date; formattedDate: string }[] = [];
  selectedDate: number = new Date().getDate();
  notFoundAnimation: AnimationOptions = {
    path: 'assets/images/main/dashboard/db-empty-1.json',
    loop: true,
    autoplay: true,
  };
  isPendingNotifications: boolean = false;
  uniqueColors: string[] = [
    '#7da9ff',
    '#f48c7d',
    '#ff7edb',
    '#ffe27c',
    '#ffe27c',
    '#a1ff7c',
    '#7cfff6',
    '#ff3434',
    '#ff349a',
    '#e434ff',
  ];

  constructor(
    public appControlService: AppControlService,
    public dataService: DataService,
    private datePipe: DatePipe
  ) {
    this.generateFormattedDates();
  }

  ngOnInit(): void {
    setTimeout(() => {
      document.querySelector('.active-day')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }, 100);
  }

  generateFormattedDates() {
    const daysInMonth = new Date(
      this.selectedMonth.getFullYear(),
      this.selectedMonth.getMonth() + 1,
      0
    ).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(
        this.selectedMonth.getFullYear(),
        this.selectedMonth.getMonth(),
        day
      );
      const formattedDate: any = this.datePipe.transform(
        currentDate,
        'EEEdd',
        'en-US'
      );
      this.dateArray.push({
        formattedDate:
          formattedDate.substring(0, 2) + formattedDate.substring(3),
        originalDate: currentDate,
      });
    }
  }

  onToggleNotifications(): void {
    try {
      if (this.dataService.checkPendingNotifications())
        TsSdk.clearActiveNotificationStatus();
      this.appControlService.showNotifications = true;
    } catch (error) {
      console.error(error);
    }
  }
}
