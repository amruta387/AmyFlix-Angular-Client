## AmyFlixAngularClient

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

A Movie App Built with Angular
AmyFlix-Angular-Client is an Angular-based frontend application for a movie database, allowing users to browse movies, learn about directors/genres, and manage their favorite movies. The app interacts with a RESTful API to provide a seamless user experience.

## Features
✅ User Registration & Login
✅ View a list of all movies
✅ View details about a single movie
✅ Get information about directors and genres
✅ Create and manage a user profile
✅ Add or remove favorite movies
✅ Secure authentication using JWT


# Installation & Setup
1️⃣ Clone the Repository
- git clone https://github.com/your-username/AmyFlix-Angular-Client.git
cd AmyFlix-Angular-Client
2️⃣ Install Dependencies
- npm install
3️⃣ Run the Development Server
- ng serve
Then, open http://localhost:4200 in your browser.

## API Endpoints Used
- Register User : /users	POST
- Login User: /login	POST
- Get All Movies: /movies	GET
- Get Movie by Title: /movies/:title	GET
- Get Director Info: /directors/:name	GET
- Get Genre Info: /genres/:name	GET
- Get User Info: /users/:username	GET
- Get Favorite Movies: /users/:username/movies	GET
- Add Favorite Movie: /users/:username/movies/:movieId	POST
- Edit User Info: /users/:username	PUT
- Delete User: /users/:username	DELETE
- Remove Favorite Movie: /users/:username/movies/:movieId	DELETE

