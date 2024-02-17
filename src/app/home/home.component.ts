import { Component, OnInit } from '@angular/core';
import { CurrentUserInfoService } from '../services/current-user-info.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(
    private currentUserInfoService: CurrentUserInfoService) {
  }

  ngOnInit(): void {
    this.currentUserInfoService.getAndLogCurrentUserInfo();
  }
}
