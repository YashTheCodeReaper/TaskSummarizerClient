import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppControlService } from 'src/app/services/app-control.service';
import { DataService } from 'src/app/services/data.service';

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
  formattedDates: string[] | any = [];
  selectedDate: number = new Date().getDate();
  notFoundAnimation: AnimationOptions = {
    path: 'assets/images/main/dashboard/db-empty-1.json',
    loop: true,
    autoplay: true,
  };

  constructor(
    public appControlService: AppControlService,
    public dataService: DataService,
    private datePipe: DatePipe
  ) {
    this.generateFormattedDates();
  }

  ngOnInit(): void {
    setTimeout(() => {
      document
        .querySelector('.active-day')
        ?.scrollIntoView({
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
      this.formattedDates.push(
        formattedDate.substring(0, 2) + formattedDate.substring(3)
      );
    }
  }
}
