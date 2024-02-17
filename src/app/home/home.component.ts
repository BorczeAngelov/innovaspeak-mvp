import { Component, OnInit } from '@angular/core';
import { CurrentUserInfoService } from '../services/current-user-info.service';
import { VoxCallWrapperService } from '../services/vox-call-wrapper.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  username: string = '';
  password: string = '';
  callerNumber: string = '';

  messages: any[] = [];

  constructor(
    private currentUserInfoService: CurrentUserInfoService,
    private voxCallService: VoxCallWrapperService) {
  }

  ngOnInit(): void {
    this.currentUserInfoService.getAndLogCurrentUserInfo(); // todo: reuse data from currentUserInfo

    this.voxCallService.transcriptMessages$.subscribe(messages => {
      this.messages = messages;
    });
  }

  async login(): Promise<void> {
    await this.voxCallService.loginAsync(this.username, this.password);
  }

  async call(): Promise<void> {
    await this.voxCallService.callAsync(this.callerNumber);
  }

  async hangUp(): Promise<void> {
    await this.voxCallService.hangUpAsync();
  }
}
