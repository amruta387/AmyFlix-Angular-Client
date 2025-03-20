import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule,
    MatDialogModule
  ],
  
})
export class UserProfileComponent {
  user: any;

  constructor(private fetchApiData: FetchApiDataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const username = 'someusername'; // You can use the route params or some global auth state
    this.fetchApiData.getUser(username).subscribe((data) => {
      this.user = data;
    });
  }

  editProfile(): void {
    // Logic to edit the profile, for now, just log it
    console.log('Editing profile for', this.user.username);
  }
}
