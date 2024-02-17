import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private oauthService: OAuthService, private router: Router) { }

  ngOnInit() {
    if (!this.oauthService.hasValidAccessToken()) {
      console.log('HomeComponent: No valid access token found, redirecting to login.');
      this.router.navigateByUrl('/login');
    } else {
      console.log('HomeComponent: User is logged in, displaying home page.');
      // User is logged in, display the home page or perform other actions as needed
    }
  }
}
