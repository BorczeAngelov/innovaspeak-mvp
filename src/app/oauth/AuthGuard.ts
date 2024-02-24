import { CanActivateFn, Router, } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

export const AuthGuardFn: CanActivateFn = () => inject(AuthGuardService).canActivate();

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private oauthService: OAuthService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    // return true // even if this fails, the rest calls wont work.
    // we use values of CurrentUserSubscription instead
    return await this.checkLogin();
  }

  private async checkLogin(): Promise<boolean> {
    return this.oauthService.tryLogin().then(success => {
      if (this.oauthService.hasValidAccessToken()) {
        return true;
      } else {
        console.log('AuthGuardService: No valid access token found, redirecting to login.');
        this.router.navigate(['/login']);
        return false;
      }
    }).catch(err => {
      console.error('OAuthCallbackError: Error during login process', err);
      // Optionally redirect to an error page or back to login
      this.router.navigate(['/login']); // Use a more appropriate route if you have an error page
      return false;
    });
  }
}