import { Component, OnInit } from '@angular/core';
import { MemberfulDataService } from '../services/memberful-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private memberfulDataService: MemberfulDataService) {
  }

  ngOnInit(): void {
    this.memberfulDataService.getAndLogCurrentMemberData();
  }

}
