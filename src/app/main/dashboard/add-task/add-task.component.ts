import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { AppControlService } from 'src/app/services/app-control.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AddTaskComponent {
  taskFormGroup!: FormGroup;
  taskType: string = 'jira';
  subTasks: { name: string; status: 'completed' | 'inactive' }[] = [];
  members: { user_id: string }[] = [];
  newSubTask: boolean = false;
  newTaskText: string = '';
  startDate: Date = new Date();
  priorities: { name: string; icon: string; color: string }[] = [];
  categories: { name: string; icon: string; color: string }[] = [];
  selectedCategories: { name: string; icon: string; color: string }[] = [];
  selectedPriority: { name: string; icon: string; color: string };
  showPriorityFlex: boolean = false;
  showCategoryFlex: boolean = false;

  constructor(private appControlService: AppControlService) {
    this.subTasks = [];
    this.priorities = [
      {
        name: 'Low',
        icon: 'fi-rr-angle-down',
        color: 'var(--theme-var-1)',
      },
      {
        name: 'Medium',
        icon: 'fi-sr-bars-progress',
        color: '#ffe27c',
      },
      {
        name: 'High',
        icon: 'fi-rr-angle-up',
        color: 'var(--danger-color-1)',
      },
      {
        name: 'Critical',
        icon: 'fi-br-ban',
        color: 'var(--danger-color)',
      },
    ];
    this.categories = [
      {
        name: 'Bug',
        icon: 'fi-sr-bug',
        color: 'var(--danger-color)',
      },
      {
        name: 'Improvement',
        icon: 'fi-sr-chevron-double-up',
        color: 'var(--theme-var-1)',
      },
      {
        name: 'Enhancement',
        icon: 'fi-sr-select',
        color: 'var(--success-color)',
      },
      {
        name: 'Feature',
        icon: 'fi-sr-apps-add',
        color: 'var(--theme-var-1)',
      },
    ];
    this.selectedPriority = this.priorities[0];
    this.selectedCategories.push(this.categories[0]);
    this.initTaskFormGroup();
  }

  initTaskFormGroup(): void {
    try {
      this.taskFormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        type: new FormControl(this.taskType, [Validators.required]),
        priority: new FormControl(this.selectedPriority.name, [
          Validators.required,
        ]),
        category: new FormControl(
          JSON.stringify(
            this.selectedCategories.map((category) => category.name)
          )
        ),
        startDate: new FormControl(this.startDate, [Validators.required]),
        dueDate: new FormControl(''),
        duration: new FormControl(''),
        startTime: new FormControl(''),
        subTasks: new FormControl(JSON.stringify(this.subTasks)),
        members: new FormControl(JSON.stringify(this.members)),
      });
    } catch (error) {
      console.error(error);
    }
  }

  onFieldFocus(fieldIndex: number): void {
    try {
      document
        .querySelector(`.input-group-at-${fieldIndex}`)
        ?.classList.toggle('input-group-focus');
    } catch (error) {
      console.error(error);
    }
  }

  validateField(formGroup: any, fieldName: string) {
    return (
      (formGroup.controls[fieldName].touched &&
        formGroup.controls[fieldName].errors) ||
      (!formGroup.controls[fieldName].pristine &&
        formGroup.controls[fieldName].invalid)
    );
  }

  onTaskCompleted(subTaskIndex: number): void {
    try {
      if (this.subTasks[subTaskIndex].status == 'completed')
        this.subTasks[subTaskIndex].status = 'inactive';
      else this.subTasks[subTaskIndex].status = 'completed';
    } catch (error) {
      console.error(error);
    }
  }

  onAddTask(): void {
    try {
      this.subTasks.push({ name: this.newTaskText, status: 'inactive' });
      this.newSubTask = false;
      this.newTaskText = '';
    } catch (error) {
      console.error(error);
    }
  }

  onSelectPriority(priorityIndex: number): void {
    try {
      this.selectedPriority = this.priorities[priorityIndex];
      this.showPriorityFlex = false;
    } catch (error) {
      console.error(error);
    }
  }

  onSelectCategory(categoryIndex: number): void {
    try {
      const isCategoryAlreadyPresent = this.selectedCategories.findIndex(
        (category) => category.name == this.categories[categoryIndex].name
      );
      if (isCategoryAlreadyPresent < 0) {
        this.selectedCategories.push(this.categories[categoryIndex]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  onTasktypeSwitch(type: string): void {
    try {
      this.taskFormGroup.reset();
      this.startDate = new Date();
      this.initTaskFormGroup();
      this.taskType = type;
    } catch (error) {
      console.error(error);
    }
  }

  onCloseAddTask(): void {
    try {
      this.appControlService.confirmDialog(
        'Are you sure want to cancel adding task?',
        (result: any) => {
          if (result) this.appControlService.showAddTask = false;
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
