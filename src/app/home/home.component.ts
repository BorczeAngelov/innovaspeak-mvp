import { Component, OnInit } from '@angular/core';
import { MemberfulDataService } from '../services/memberful-data.service';
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
    private memberfulDataService: MemberfulDataService,
    private currentUserInfoService: CurrentUserInfoService) {
  }

  ngOnInit(): void {
    this.memberfulDataService.getAndLogCurrentMemberData();
    this.currentUserInfoService.getAndLogCurrentUserInfo();
  }

}
