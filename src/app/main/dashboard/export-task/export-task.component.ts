import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppControlService } from 'src/app/services/app-control.service';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

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
  selector: 'app-export-task',
  templateUrl: './export-task.component.html',
  styleUrls: ['./export-task.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ExportTaskComponent {
  taskExportFormGroup!: FormGroup;
  maxDate = new Date();
  chosenExportType: string = 'csv';
  exportHistory: {name: string, date: string, size: string, type: string, status: 'success' | 'failed'}[] = [];

  constructor(public appControlService: AppControlService) {
    this.taskExportFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
    });

    this.exportHistory = [
      {
        name: 'Yashwanth_10to12_2023',
        date: '10th Nov, 2023',
        size: '10mb',
        type: 'csv',
        status: 'success'
      },
      {
        name: 'Yashwanth_25to29_2023',
        date: '12th Nov, 2023',
        size: '500kb',
        type: 'pdf',
        status: 'failed'
      },
      {
        name: 'Yashwanth_10to12_2023',
        date: '20th Nov, 2023',
        size: '1.6mb',
        type: 'excel',
        status: 'success'
      },
      {
        name: 'Yashwanth_10to12_2023',
        date: '10th Nov, 2023',
        size: '10mb',
        type: 'csv',
        status: 'failed'
      }
    ]
  }

  onFieldFocus(fieldIndex: number): void {
    try {
      document
        .querySelector(`.input-group-te-${fieldIndex}`)
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
}
