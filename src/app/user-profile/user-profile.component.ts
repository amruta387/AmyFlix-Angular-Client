import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavigationComponent } from '../navigation/navigation.component';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavigationComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  isEditing: boolean = false;
  updatedUser: any = {};

  constructor(private apiService: FetchApiDataService, private router: Router) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    const username = localStorage.getItem('username');
    console.log("Retrieved username:", username);

    if (!username) {
      console.error("Username not found in localStorage!");
      return;
    }

    this.apiService.getUser(username).subscribe({
      next: (response) => {
        console.log("User API response:", response);
        this.user = response;
        this.updatedUser = { ...response };
      },
      error: (error) => console.error("Error fetching user data:", error)
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  // Save profile changes
  saveProfile(): void {
    const username = localStorage.getItem('username');
    if (username) {

      this.apiService.editUser(username, this.updatedUser).subscribe({
        next: () => {

          this.user = { ...this.updatedUser };
          this.isEditing = false;

          if (this.updatedUser.username && this.updatedUser.username !== username) {
            localStorage.setItem('username', this.updatedUser.username);
          }
        },
        error: (error) => {
          console.error('Error updating user:', error);
          alert('There was an error updating your profile. Please try again later.');
        }
      });
    }
  }

  deleteAccount(): void {

    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      const username = localStorage.getItem('username');
      console.log('Attempting to delete user:', username);

      if (!username) {
        console.error('Username not found in localStorage!');
        return;
      }

      this.apiService.deleteUser(username).subscribe({
        next: (response) => {
          console.log(`Response from API: ${response}`);

          localStorage.clear();

          alert('Your account has been successfully deleted.');

          this.router.navigate(['/welcome']);
        },
        error: (error) => {
          console.error('Error deleting user:', error);

          alert('There was an error deleting your account. Please try again later.');
        },
      });
    }
  }
}