import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  private apiUrl = 'https://amy-flix-movie-app-ce4aa0da3eb4.herokuapp.com'; 

  constructor(private http: HttpClient) {}

  // User Registration
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  // User Login
  loginUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  // Get All Movies
  getAllMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies`);
  }

  // Get One Movie
  getMovie(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies/${title}`);
  }

  // Get Director
  getDirector(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/directors/${name}`);
  }

  // Get Genre
  getGenre(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/genres/${name}`);
  }

  // Get User Info
  getUser(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}`);
  }

  // Get Favorite Movies for a User
  getFavoriteMovies(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}/movies`);
  }

  // Add Movie to Favorite Movies
  addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${username}/movies/${movieId}`, {});
  }

  // Edit User
  editUser(username: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${username}`, updatedData);
  }

  // Delete User
  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${username}`);
  }

  // Remove a Movie from Favorite Movies
  removeFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${username}/movies/${movieId}`);
  }
}
