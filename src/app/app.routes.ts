import { Route } from '@angular/router';
import { WelcomeComponent } from './welcome-page/welcome-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

export const routes: Route[] = [

    { path: '', component: WelcomeComponent },
    { path: 'movies', component: MovieCardComponent},
    { path: 'profile', component: UserProfileComponent },
    { path: '**', redirectTo: '' }
];
