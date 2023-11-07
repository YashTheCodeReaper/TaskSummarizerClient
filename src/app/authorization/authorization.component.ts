import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isSignIn: boolean = false;
  stages: {
    name: string;
    description: string;
    flatIcon: string;
  }[] = [];
  currentStage: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.stages = [
      {
        name: 'Create Credentials',
        description: 'Create your credentials to proceed',
        flatIcon: 'fi-rr-shield-check',
      },
      {
        name: 'JIRA Setup',
        description: 'Please verify your JIRA credential',
        flatIcon: 'fi-brands-jira',
      },
      {
        name: 'KEKA Setup',
        description: 'Please verify your KEKA credential',
        flatIcon: 'fi-rr-book-user',
      },
      {
        name: 'ZOHO Setup',
        description: 'Please verify your ZOHO credential',
        flatIcon: 'fi-rr-calendar',
      },
      {
        name: 'Get Set Go!',
        description: 'Proceed to the application',
        flatIcon: 'fi-sr-sledding',
      },
    ];

    this.loginFormGroup = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {}

  onFieldFocus(fieldIndex: number): void {
    try {
      document
        .querySelector(`.input-group-aw-${fieldIndex}`)
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
