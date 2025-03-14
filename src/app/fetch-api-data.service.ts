import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Define interfaces for better type safety
interface UserData {
  username: string;
  password: string;
}

interface Movie {
  id: string;
  title: string;
  director: string;
  genre: string;
  year: number;
}

interface Response {
  token?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  private apiUrl = 'https://amy-flix-movie-app-ce4aa0da3eb4.herokuapp.com'; 

  constructor(private http: HttpClient) {}

  // Token Management
  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // User Registration
  registerUser(userData: UserData): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userData)
      .pipe(catchError(this.handleError));
  }

  // User Login - Token management added
  loginUser(userData: UserData): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, userData)
      .pipe(
        map((response: Response) => {
          if (response.token) {
            this.setToken(response.token);  // Store the token on successful login
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  // Get All Movies
  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`, {
      headers: { 'Authorization': `Bearer ${this.getToken()}` }
    }).pipe(catchError(this.handleError));
  }

  // Get One Movie
  getMovie(title: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${title}`, {
      headers: { 'Authorization': `Bearer ${this.getToken()}` }
    }).pipe(catchError(this.handleError));
  }

  // Get Director
  getDirector(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/directors/${name}`, {
      headers: { 'Authorization': `Bearer ${this.getToken()}` }
    }).pipe(catchError(this.handleError));
  }

  // Get Genre
  getGenre(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/genres/${name}`, {
      headers: { 'Authorization': `Bearer ${this.getToken()}` }
    }).pipe(catchError(this.handleError));
  }

  // Get User Info
  getUser(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}`, {
      headers: { 'Authorization': `Bearer ${this.getToken()}` }
    }).pipe(catchError(this.handleError));
  }

  // Get Favorite Movies for a User
  getFavoriteMovies(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}/movies`, {
      headers: { 'Authorization': `Bearer ${this.getToken()}` }
    }).pipe(catchError(this.handleError));
  }

  // Add Movie to Favorite Movies
  addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${username}/movies/${movieId}`, {}, {
      headers: { 'Authorization': `Bearer ${this.getToken()}` }
    }).pipe(catchError(this.handleError));
  }

  // Edit User
  editUser(username: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${username}`, updatedData, {
      headers: { 'Authorization': `Bearer ${this.getToken()}` }
    }).pipe(catchError(this.handleError));
  }

  // Delete User
  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${username}`, {
      headers: { 'Authorization': `Bearer ${this.getToken()}` }
    }).pipe(catchError(this.handleError));
  }

  // Remove a Movie from Favorite Movies
  removeFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${username}/movies/${movieId}`, {
      headers: { 'Authorization': `Bearer ${this.getToken()}` }
    }).pipe(catchError(this.handleError));
  }

  // Error Handling Function
  private handleError(error: any): Observable<never> {
    console.error('API error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}
