import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';  // Import Router
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fetchApiDataService: FetchApiDataService, 
    public dialogRef: MatDialogRef<LoginFormComponent>,
    private snackBar: MatSnackBar,
    private router: Router 
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
    localStorage.removeItem('token');
    localStorage.removeItem('username');

      this.fetchApiDataService.loginUser({
        username, password,
        email: ''
      }).subscribe(
        (response) => {
          if (response.token) {
            localStorage.setItem('token', response.token); 
            localStorage.setItem('username', username);     

            this.snackBar.open('Login successful!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });

            this.dialogRef.close(true);

            this.router.navigate(['movies']);
          } else {
            this.snackBar.open('Login failed! Invalid credentials.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          }
        },
        (error) => {
          this.snackBar.open('Login failed! Server error occurred.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
      );
    }
  }
}
