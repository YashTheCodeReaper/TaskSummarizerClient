import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppControlService } from 'src/app/services/app-control.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  userObj: any;

  constructor(
    public appControlService: AppControlService,
    public dataService: DataService,
    private router: Router
  ) {
    this.userObj = this.dataService.userObj;
  }

  getMiniUserName(name: string): string | any {
    try {
      return name.split(' ').length > 1
        ? name.split(' ')[0][0] + name.split(' ')[1][0]
        : name.split(' ')[0][0] + name.split(' ')[0][1];
    } catch (error) {
      console.error(error);
    }
  }

  onSelectBoard(boardObject: any): void {
    try {
      this.dataService.selectedBoard = boardObject;
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
    }
  }
}
