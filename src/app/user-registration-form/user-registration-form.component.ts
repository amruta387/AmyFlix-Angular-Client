import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-registration-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent {
  registrationForm: FormGroup;

  constructor(
    private fetchApiDataService: FetchApiDataService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    private snackBar: MatSnackBar
  ) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/\d/),
          Validators.pattern(/[a-z]/),
          Validators.pattern(/[A-Z]/),
          Validators.pattern(/[!@#$%^&*]/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      birthday: [''],
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    const userData = this.registrationForm.value;
    this.fetchApiDataService.registerUser(userData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.snackBar.open('Account registered successfully!', 'Close', {
          duration: 3000, 
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        this.dialogRef.close();
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }
}
