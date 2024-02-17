import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig, OAuthErrorEvent } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private oauthService: OAuthService, private authConfig: AuthConfig) {
    this.oauthService.configure(authConfig);

    this.oauthService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        console.error('OAuthErrorEvent Object:', event);
      } else {
        console.warn('OAuthEvent', event);
      }
    });
  }

  public login() {
    this.oauthService.initCodeFlow();
  }

  public logOut() {
    this.oauthService.logOut();
  }

  public getAccessToken(): string | null {
    return this.oauthService.getAccessToken();
  }

  // Add other methods as needed, leveraging OAuthService for tasks such as token refresh
  // Note: there might be out-of-the-box solutions for token refresh from angular-oauth2-oidc lib
}
