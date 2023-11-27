import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  registerFormGroup!: FormGroup;
  jiraFormGroup!: FormGroup;
  isSignIn: boolean = false;
  currentStage: number = 1;
  authAnimation1: AnimationOptions = {
    path: 'assets/images/main/auth/auth1.json',
    loop: true,
    autoplay: true,
  };
  authAnimation2: AnimationOptions = {
    path: 'assets/images/main/auth/auth2.json',
    loop: true,
    autoplay: true,
  };
  staySigned: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.registerFormGroup = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    this.jiraFormGroup = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      apiToken: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
    });
  }

  ngOnInit(): void {}

  onFieldFocus(fieldIndex: number): void {
    try {
      document
        .querySelector(`.input-group-auth-${fieldIndex}`)
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

  moveForm(): void {
    try {
      if (this.currentStage < 3) {
        if (this.currentStage == 1)
          this.jiraFormGroup.controls['email'].setValue(
            this.registerFormGroup.value.email
          );
        this.currentStage++;
      } else {
        let finalObj = this.registerFormGroup.value;
        finalObj.jira = this.jiraFormGroup.value;
        finalObj.staySigned = this.staySigned;
        console.log(finalObj);
      }
    } catch (error) {
      console.error(error);
    }
  }

  getButtonValidation(): boolean | any {
    try {
      switch (this.currentStage) {
        case 1:
          return this.registerFormGroup.valid;
        case 2:
          return this.jiraFormGroup.valid;
        default:
          return true;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
