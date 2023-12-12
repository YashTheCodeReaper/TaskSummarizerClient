import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { AppControlService } from '../services/app-control.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommunicationService } from '../services/communication.service';

declare var TsSdk: any;

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  registerFormGroup!: FormGroup;
  signInFormGroup!: FormGroup;
  jiraFormGroup!: FormGroup;
  userFormGroup!: FormGroup;
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
  availableDesignations: { id: number; name: string; description: string }[] = [
    {
      id: 1,
      name: 'Trainee Software Engineer',
      description: '',
    },
    {
      id: 1,
      name: 'Junior Software Engineer',
      description: '',
    },
    {
      id: 1,
      name: 'Software Engineer',
      description: '',
    },
    {
      id: 1,
      name: 'Senior Software Engineer',
      description: '',
    },
    {
      id: 1,
      name: 'Associate Technical Lead',
      description: '',
    },
    {
      id: 1,
      name: 'Technical Lead',
      description: '',
    },
    {
      id: 1,
      name: 'Others',
      description: '',
    },
  ];
  showDesignationsFlex: boolean = false;
  imageDataUrl: any = '';

  constructor(
    private formBuilder: FormBuilder,
    public appControlService: AppControlService,
    private _snackBar: MatSnackBar,
    private commService: CommunicationService
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
    this.signInFormGroup = this.formBuilder.group({
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
    this.userFormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      designation: new FormControl('', [Validators.required]),
      profilePicture: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.commService.callbacksObservable.subscribe((callbackObj: any) => {
      switch (callbackObj.callbackEvent) {
        case 'registered_user': {
          this._snackBar.open(callbackObj.callbackData.message, 'Great', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          break;
        }
      }
    });
  }

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
      if (this.currentStage == 4) {
        this.isSignIn = true;
        return;
      }
      if (this.currentStage < 3) {
        if (this.currentStage == 1)
          this.jiraFormGroup.controls['email'].setValue(
            this.registerFormGroup.value.email
          );
      } else {
        let finalObj = {
          ...this.registerFormGroup.value,
          ...this.userFormGroup.value,
        };
        finalObj.jira = JSON.stringify(this.jiraFormGroup.value);
        TsSdk.registerUser(finalObj);
      }
      this.currentStage++;
    } catch (error) {
      console.error(error);
    }
  }

  onChooseDesignation(desObj: any): void {
    try {
      this.userFormGroup.controls['designation'].setValue(desObj.name);
      this.showDesignationsFlex = false;
    } catch (error) {
      console.error(error);
    }
  }

  getButtonValidation(): boolean | any {
    try {
      if (this.isSignIn) return this.signInFormGroup.valid;
      switch (this.currentStage) {
        case 1:
          return this.registerFormGroup.valid;
        case 2:
          return this.jiraFormGroup.valid;
        case 3:
          return this.userFormGroup.valid;
        default:
          return true;
      }
    } catch (error) {
      console.error(error);
    }
  }

  onImageSelection(files: FileList | any): void {
    try {
      const file = files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const img: any = new Image();
          img.onload = () => {
            const aspectRatio = img.width / img.height;
            if (aspectRatio != 1) return;

            let newWidth, newHeight;
            if (aspectRatio > 1) {
              newWidth = 500;
              newHeight = 500 / aspectRatio;
            } else {
              newWidth = 500 * aspectRatio;
              newHeight = 500;
            }
            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx: any = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            this.imageDataUrl = canvas.toDataURL('image/png');
            this.userFormGroup.controls['profilePicture'].setValue(
              this.imageDataUrl
            );
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      const HTMLFileUploadElement: any =
        document.getElementById(`file-selector`);
      if (HTMLFileUploadElement) HTMLFileUploadElement.value = '';
    } catch (error) {
      console.error(error);
    }
  }

  onDesignationFlexOutsideClick(): void {
    try {
      if (
        !this.availableDesignations.some(
          (desObj) => desObj == this.userFormGroup.controls['designation'].value
        )
      ) {
        this.userFormGroup.controls['designation'].setValue('');
      }
      this.showDesignationsFlex = false;
    } catch (error) {
      console.error(error);
    }
  }

  filterObject(designationsArray: any[]): any[] | any {
    try {
      return designationsArray.filter((desObj) =>
        desObj.name
          .replaceAll(' ', '')
          .toLowerCase()
          .includes(
            this.userFormGroup.controls['designation'].value
              .replaceAll(' ', '')
              .toLowerCase()
          )
      );
    } catch (error) {
      console.error();
    }
  }
}
