import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppControlService } from 'src/app/services/app-control.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  chosenOneAnimation: AnimationOptions = {
    path: 'assets/images/main/team/chosenone.json',
    loop: true,
    autoplay: true,
  };
  newTeamsAnimation: AnimationOptions = {
    path: 'assets/images/main/team/newTeam.json',
    loop: true,
    autoplay: true,
  };
  members = [
    {
      name: 'Sachin Tendulkar',
      designation: 'Technical Lead',
      profilePic: 'https://i.pravatar.cc/100?img=52',
      jiraHeat: [
        {
          name: 'Product QA',
          heatMap: Array.from({ length: 7 }, () => this.getRandomInt(0, 5)),
        },
        {
          name: 'Engineering QA',
          heatMap: Array.from({ length: 7 }, () => this.getRandomInt(0, 5)),
        },
        {
          name: 'Project QA',
          heatMap: Array.from({ length: 7 }, () => this.getRandomInt(0, 5)),
        },
        {
          name: 'Product Backlogs',
          heatMap: Array.from({ length: 7 }, () => this.getRandomInt(0, 5)),
        },
      ],
    },
    {
      name: 'Karen',
      designation: 'Senior Software Engineer',
      profilePic: 'https://i.pravatar.cc/100?img=53',
      jiraHeat: [
        {
          name: 'Product QA',
          heatMap: Array.from({ length: 7 }, () => this.getRandomInt(0, 5)),
        },
        {
          name: 'Engineering QA',
          heatMap: Array.from({ length: 7 }, () => this.getRandomInt(0, 5)),
        },
        {
          name: 'Project QA',
          heatMap: Array.from({ length: 7 }, () => this.getRandomInt(0, 5)),
        },
        {
          name: 'Product Backlogs',
          heatMap: Array.from({ length: 7 }, () => this.getRandomInt(0, 5)),
        },
      ],
    },
    {
      name: 'John Wick',
      designation: 'Software Engineer',
      profilePic: 'https://i.pravatar.cc/100?img=42',
      jiraHeat: [
        {
          name: 'Product QA',
          heatMap: Array.from({ length: 7 }, () => this.getRandomInt(0, 5)),
        },
        {
          name: 'Engineering QA',
          heatMap: Array.from({ length: 7 }, () => this.getRandomInt(0, 5)),
        },
        {
          name: 'Project QA',
          heatMap: Array.from({ length: 7 }, () => this.getRandomInt(0, 5)),
        },
        {
          name: 'Product Backlogs',
          heatMap: Array.from({ length: 7 }, () => this.getRandomInt(0, 5)),
        },
      ],
    },
    {
      name: 'Kavana K',
      designation: 'Software Engineer',
      profilePic: 'https://i.pravatar.cc/100?img=59',
      jiraHeat: [
        {
          name: 'Product QA',
          heatMap: Array.from({ length: 7 }, () => this.getRandomInt(0, 5)),
        },
        {
          name: 'Engineering QA',
          heatMap: Array.from({ length: 7 }, () => this.getRandomInt(0, 5)),
        },
        {
          name: 'Project QA',
          heatMap: Array.from({ length: 7 }, () => this.getRandomInt(0, 5)),
        },
        {
          name: 'Product Backlogs',
          heatMap: Array.from({ length: 7 }, () => this.getRandomInt(0, 5)),
        },
      ],
    },
  ];

  constructor(
    public appControlService: AppControlService,
    public dataService: DataService,
    private router: Router
  ) {
    this.prepareHeatMap();
  }

  getColor(projectName: string): string | any {
    try {
      switch (projectName) {
        case 'Product QA':
          return '#7da9ff';
        case 'Engineering QA':
          return '#f48c7d';
        case 'Project QA':
          return '#ffe27c';
        default:
          return '#ff7edb';
      }
    } catch (error) {
      console.error();
    }
  }

  prepareHeatMap(): void {
    try {
      this.members.forEach((memberObj: any) => {
        let highestCount: number = 0;
        memberObj.jiraHeat.forEach((heatObj: any) => {
          heatObj.heatMap.forEach((heatCount: any) => {
            if (heatCount > highestCount) highestCount = heatCount;
          });
        });

        memberObj.jiraHeat.forEach((heatObj: any, index: number) => {
          memberObj.jiraHeat[index].heatMap = heatObj.heatMap.map(
            (heatCount: any) => {
              return heatCount / highestCount;
            }
          );
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onCreateNewTeam(): void {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  onPromptNewTeam(): void {
    try {
      if (!this.dataService.boards.length) {
        this.appControlService.confirmDialog(
          'Please create a board to continue',
          (result: any) => {
            this.router.navigate(['/']);
          }
        );
      } else this.appControlService.showNewTeam = true;
    } catch (error) {
      console.error(error);
    }
  }
}
