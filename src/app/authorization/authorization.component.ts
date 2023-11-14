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
  isSignIn: boolean = true;
  currentStage: number = 1;
  authAnimation: AnimationOptions = {
    path: 'assets/images/main/auth/auth1.json',
    loop: true,
    autoplay: true,
  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.registerFormGroup = this.formBuilder.group({
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
}
