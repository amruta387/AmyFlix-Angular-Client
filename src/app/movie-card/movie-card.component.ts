import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule], 
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = []; // Store all movies

  constructor(public dialog: MatDialog, private fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.getMovies(); // Fetch movies on component load
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (resp: any) => {
        this.movies = resp;
        console.log('Movies:', this.movies);
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  openMovieDetails(movieId: string): void {
    const dialogRef = this.dialog.open(MovieDetailsComponent, {
      data: { movieId },
      width: '600px',
      panelClass: 'movie-details-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Movie details:', result);
      }
    });
  }

  addToFavorites(movieId: string): void {
    const username = localStorage.getItem('username'); 

    if (!username) {
      console.error('No username found in localStorage');
      return;
    }

    this.fetchApiData.addFavoriteMovie(username, movieId).subscribe(
      response => {
        console.log('Movie added to favorites:', response);
      },
      error => {
        console.error('Error adding to favorites:', error);
      }
    );
  }
}
