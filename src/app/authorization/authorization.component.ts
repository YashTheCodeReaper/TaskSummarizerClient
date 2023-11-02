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
  newUserFormGroup!: FormGroup;
  stages: {
    name: string;
    description: string;
    status: 'active' | 'completed' | 'inactive';
  }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.stages = [
      {
        name: 'Create Credentials',
        description: 'Create your credentials to proceed',
        status: 'active',
      },
      {
        name: 'JIRA Setup',
        description: 'Configure your JIRA essential credentials',
        status: 'inactive',
      },
      {
        name: 'KEKA Setup',
        description: 'Configure your KEKA essential credentials',
        status: 'inactive',
      },
      {
        name: 'MS Teams Setup',
        description: 'Configure your KEKA essential credentials',
        status: 'inactive',
      },
      {
        name: 'Get Set Go!',
        description: 'Proceed to the application',
        status: 'inactive',
      },
    ];
    this.newUserFormGroup = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
}
