import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Define interfaces 
interface Genre {
  name: string;
  description: string;
}

interface Director {
  name: string;
  birth_year: number;
}

export interface Movie {
  _id: string;
  title: string;
  release_year: number;
  genre: Genre;
  director: Director;
  poster?: string;
  featured: boolean;
  director_bio: string;
}

interface Response {
  token?: string;
  message?: string;
}

interface UserData {
  username: string;
  password: string;
  email: string;
  birthday?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  private apiUrl = 'https://amy-flix-movie-app-ce4aa0da3eb4.herokuapp.com';

  constructor(private http: HttpClient) { }


  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
  }

  // User Registration
  registerUser(userData: UserData): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userData)
      .pipe(catchError(this.handleError));
  }

  // User Login 
  loginUser(userData: UserData): Observable<any> {
    return this.http.post<Response>(`${this.apiUrl}/auth/login`, userData)
      .pipe(
        map((response) => {
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
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Get One Movie
  getMovie(title: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${title}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }


  // Get Director
  getDirector(name: string): Observable<Director> {
    return this.http.get<Director>(`${this.apiUrl}/directors/${name}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Get Genre
  getGenre(name: string): Observable<Genre> {
    return this.http.get<Genre>(`${this.apiUrl}/genres/${name}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Get User Info
  getUser(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/me`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }
  // Edit User
  editUser(username: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${username}`, updatedData, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Get Favorite Movies for a User
  getFavoriteMovies(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}/favoriteMovies`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Add Movie to Favorite Movies
  addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${username}/movies/${movieId}`, {},
      { headers: this.getAuthHeaders(), responseType: 'text' as 'json' } // Expecting text response
    ).pipe(map(response => {
      console.log("Movie added to favorites:", response);
      return response;
    }),
      catchError(this.handleError)
    );
  }


  // Remove a Movie from Favorite Movies
  removeFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${username}/movies/${movieId}`, { headers: this.getAuthHeaders(), responseType: 'text' as 'json' } // Expecting text response
    ).pipe(map(response => {
      console.log("Movie removed from favorites:", response);
      return response;
    }),
      catchError(this.handleError)
    );
  }

  //delete user
  deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.apiUrl}/users/${username}`, {
      headers,
      responseType: 'text'
    })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error Handling Function
  private handleError(error: any): Observable<never> {
    console.error('API error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}
