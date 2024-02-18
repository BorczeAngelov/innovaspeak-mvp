import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthConfig, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';

import { routes } from './app.routes';
import { BASE_URL, PublicAuthConfig } from './oauth/PublicAuthConfig';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
    ),
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: [BASE_URL],
          sendAccessToken: true,
      },
    }).providers!,

    { provide: AuthConfig, useValue: PublicAuthConfig }, // dependency injections
    { provide: OAuthStorage, useValue: localStorage }, 
  ]
};
