import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent {
  personalInfoFormGroup!: FormGroup;
  credentialsInfoFormGroup!: FormGroup;
  currentUserInfo = {
    name: 'Yashwanthkumar Arivazhagan',
    designation: 'Junior Software Engineer',
    role: 'user',
    email: 'yashwanthkumar.arivazhagan@tetherfi.com',
    password: 'Ya01022000#',
  };
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
  showDesignationsDd: boolean = false;
  showRolesDd: boolean = false;

  constructor() {
    this.personalInfoFormGroup = new FormGroup({
      name: new FormControl(this.currentUserInfo.name, [Validators.required]),
      designation: new FormControl(this.currentUserInfo.designation, [
        Validators.required,
      ]),
      role: new FormControl(this.currentUserInfo.role, [Validators.required]),
    });
    this.credentialsInfoFormGroup = new FormGroup({
      email: new FormControl(this.currentUserInfo.email, [Validators.required]),
      password: new FormControl(this.currentUserInfo.password, [
        Validators.required,
      ]),
    });
  }

  onFieldFocus(fieldIndex: number): void {
    try {
      if (fieldIndex == 1) this.showDesignationsDd = true;
      if (fieldIndex == 2) this.showRolesDd = true;
      document
        .querySelector(`.input-group-pfs1-${fieldIndex}`)
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

  onOptionSelect(control: string, value: string) {
    try {
      this.personalInfoFormGroup.controls[control].setValue(value);
      this.showDesignationsDd = false;
      this.showRolesDd = false;
    } catch (error) {
      console.error(error);
    }
  }
}
