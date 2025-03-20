import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';  // Import MatDialogRef
import { FetchApiDataService } from '../fetch-api-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  movieDetails: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { movieId: string },
    private fetchApiData: FetchApiDataService,
    private dialogRef: MatDialogRef<MovieDetailsComponent>  // Inject MatDialogRef
  ) {}

  ngOnInit() {
    this.fetchApiData.getMovie(this.data.movieId).subscribe(details => {
      this.movieDetails = details;
    });
  }

  // Close the dialog
  closeDialog() {
    this.dialogRef.close();  // Closes the dialog
  }
}
