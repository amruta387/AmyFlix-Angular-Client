import { Component } from '@angular/core';
import { MatDialog,  MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LoginFormComponent } from '../login-form/login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule,
    MatButtonModule, 
    RouterModule
  ],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  
})
export class WelcomeComponent {

  constructor(public dialog: MatDialog) {}

  openRegistrationDialog(): void {
    const dialogRef = this.dialog.open(UserRegistrationFormComponent, {
      width: '600px',
      panelClass: 'registration-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User registered:', result);
      }
    });
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: '600px',
      panelClass: 'login-dialog-container'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User logged in:', result);
      }
    });
  }
}
