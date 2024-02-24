import { Component, OnInit } from '@angular/core';
import { BrowserHomeComponent } from './browser-home/browser-home.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BrowserHomeComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'InnovaSpeak';  
  isDesktop: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      this.isDesktop = !result.matches;
    });
  }
}
