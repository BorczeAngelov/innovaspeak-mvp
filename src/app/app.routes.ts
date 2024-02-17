import { Routes } from '@angular/router';
import { OAuthCallbackComponent } from './oauth/oauth-callback.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './oauth/login/login.component';
import { AuthGuardFn } from './oauth/AuthGuard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardFn] },
    // The login and callback route don't need protection
    { path: 'login', component: LoginComponent },
    { path: 'oauth-callback', component: OAuthCallbackComponent },
];
