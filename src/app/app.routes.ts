import { Routes } from '@angular/router';
import { OAuthCallbackComponent } from './oauth/oauth-callback.component';
import { LoginComponent } from './oauth/login/login.component';
import { AuthGuardFn } from './oauth/AuthGuard';
import { AppComponent } from './app.component';

export const routes: Routes = [    
    { path: '', component: AppComponent, canActivate: [AuthGuardFn] },
    // The login and callback route don't need protection
    { path: 'login', component: LoginComponent },
    { path: 'oauth-callback', component: OAuthCallbackComponent },
];
