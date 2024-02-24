import { Component, OnInit } from '@angular/core';
import { BrowserHomeComponent } from './browser-home/browser-home.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { AuthGuardService } from './oauth/AuthGuard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BrowserHomeComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'InnovaSpeak';  
  
  isDesktop: boolean = false;
  isAuthenticated: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private authGuardService: AuthGuardService) {}
  
  async ngOnInit() {    
    this.breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      this.isDesktop = !result.matches;
    });

    this.isAuthenticated = await this.authGuardService.canActivate();
  }
}
