import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthConfig, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';

import { routes } from './app.routes';
import { BASE_URL, PublicAuthConfig } from './oauth/PublicAuthConfig';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      HttpClientModule,
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
