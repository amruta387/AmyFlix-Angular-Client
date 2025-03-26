import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { NavigationComponent } from '../navigation/navigation.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    NavigationComponent
  ],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: string[] = []; // Stores IDs of favorite movies
  username: string = '';

  constructor(
    public dialog: MatDialog,
    private fetchApiData: FetchApiDataService
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUsername();
  }

  // Fetch all movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (resp: any) => {
        this.movies = resp;
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  // Open movie details in a dialog
  openMovieDetails(movie: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: { movie },
      width: '600px',
      panelClass: 'movie-details-dialog-container'
    });
  }

  // Retrieve the username from localStorage
  getUsername(): void {
    this.username = localStorage.getItem('username') || '';
    if (!this.username) {
      console.error('Username not found in localStorage');
    } else {
      console.log('Username retrieved:', this.username);
      // Fetch favorites once the username is set
      this.getFavoriteMovies();
    }
  }

  // Fetch user's favorite movies from the backend or localStorage
  getFavoriteMovies(): void {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    if (storedFavorites) {
      this.favoriteMovies = JSON.parse(storedFavorites);
    } else {
      if (!this.username) return;
      this.fetchApiData.getFavoriteMovies(this.username).subscribe(
        (favorites: string[]) => {
          this.favoriteMovies = favorites;
          // Store the favorites array in localStorage
          localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
        },
        (error) => {
          console.error('Error fetching favorite movies:', error);
        }
      );
    }
  }

  // Check if the movie is a favorite
  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  // Add movie to favorites
  addToFavorites(movieId: string): void {
    // Retrieve the favorite movies from localStorage
    const storedFavorites = localStorage.getItem('favoriteMovies');
    const favoriteMoviesFromStorage = storedFavorites ? JSON.parse(storedFavorites) : [];
  
    // Check if the movie is already in the favorites array (either from localStorage or in-memory array)
    if (favoriteMoviesFromStorage.includes(movieId)) {
      alert('This movie is already in your favorites!');
      return;
    }
  
    // Add the movie to favorites
    this.fetchApiData.addFavoriteMovie(this.username, movieId).subscribe(
      () => {
        // Add the movie ID to the favorites array (both in-memory and localStorage)
        favoriteMoviesFromStorage.push(movieId); // Update the array
        // Update localStorage with the new favorites array
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMoviesFromStorage));
        // Update the in-memory array
        this.favoriteMovies.push(movieId);
        console.log(`${movieId} added to favorites`);
      },
      (error) => {
        console.error('Error adding to favorites:', error);
      }
    );
  }
  

  // Remove movie from favorites
  removeFromFavorites(movieId: string): void {
    // Remove the movie from favorites
    this.fetchApiData.removeFavoriteMovie(this.username, movieId).subscribe(
      () => {
        this.favoriteMovies = this.favoriteMovies.filter(id => id !== movieId); // Update the array
        // Also, update localStorage with the new favorites array
        localStorage.setItem('favoriteMovies', JSON.stringify(this.favoriteMovies));
        console.log(`${movieId} removed from favorites`);
      },
      (error) => {
        console.error('Error removing from favorites:', error);
      }
    );
  }
}
