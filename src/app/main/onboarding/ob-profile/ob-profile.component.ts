import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ob-profile',
  templateUrl: './ob-profile.component.html',
  styleUrls: ['./ob-profile.component.scss'],
})
export class ObProfileComponent {
  obProfileFormGroup!: FormGroup;
  designations: string[] = [
    'Internee',
    'Junior Software Engineer',
    'Software Engineer',
    'Senior Software Engineer',
    'Software Architect',
    'Associate Technical Lead',
    'Technical Lead',
    'Others',
  ];
  roles: string[] = ['User', 'Manager', 'Super User'];
  showDesignationsFlex: boolean = false;
  showRolesFlex: boolean = false;

  constructor() {
    this.obProfileFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      designation: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });
  }

  onFieldFocus(fieldIndex: number): void {
    try {
      if (fieldIndex == 1)
        setTimeout(
          () => {
            this.showDesignationsFlex = !this.showDesignationsFlex;
          },
          this.showDesignationsFlex ? 250 : 0
        );
      else if (fieldIndex == 2)
        setTimeout(
          () => {
            this.showRolesFlex = !this.showRolesFlex;
          },
          this.showRolesFlex ? 250 : 0
        );
      document
        .querySelector(`.input-group-obp-${fieldIndex}`)
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

  onChoose(control: string, value: string) {
    try {
      this.obProfileFormGroup.controls[control].setValue(value);
    } catch (error) {
      console.error(error);
    }
  }
}
