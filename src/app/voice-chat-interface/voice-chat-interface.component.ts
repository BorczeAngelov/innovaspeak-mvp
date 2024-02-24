import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedImportedMatModule } from '../shared-imported-mat.module';
import { CurrentUserInfoService } from '../services/current-user-info.service';
import { VoxCallWrapperService } from '../services/vox-call-wrapper.service';
import { INNOVASPEAK_AI_AGENT_NUMBER } from '../services/PublicConfigValues';
import { CurrentUserInfo } from '../services/CurrentUserInfo';
import { Observable, map, takeWhile, timer } from 'rxjs';

@Component({
  selector: 'app-voice-chat-interface',
  standalone: true,
  imports: [SharedImportedMatModule],
  templateUrl: './voice-chat-interface.component.html',
  styleUrl: './voice-chat-interface.component.css'
})
export class VoiceChatInterfaceComponent implements OnInit, OnDestroy {

  messages$!: Observable<{ author: string, text: string }[]>;

  isCallStarted: boolean = false;
  callDuration$!: Observable<string>;
  callStartTime!: number;
  isCallActive = false;
  callStatus = 'speaking';

  constructor(
    private currentUserInfoService: CurrentUserInfoService,
    private voxCallService: VoxCallWrapperService) { }

  async ngOnInit(): Promise<void> {
  }

  async startCall() {
    console.log('VoiceChatInterfaceComponent: Initializing component and fetching current user info...');

    try {
      const currentUser = await this.currentUserInfoService.getCurrentUserInfo();
      if (!currentUser || !currentUser.id) {
        console.error('Failed to obtain current user information or user ID.');
        return;
      }

      await this.initializeVox(currentUser);
      this.isCallStarted = true;
      this.isCallActive = true;
      this.startCallTimer();

    } catch (error) {
      this.isCallStarted = false;
      this.isCallActive = false;
      console.error('VoiceChatInterfaceComponent: An error occurred during component initialization:', error);
    }
  }

  private async initializeVox(currentUser: CurrentUserInfo) {
    this.messages$ = this.voxCallService.transcriptMessages$.pipe(
      map(messages => messages.map(message => {
        const [author, ...textParts] = message.split(':');
        return { author, text: textParts.join(':') };
      }))
    );

    console.log('Logging in to VoxCall service...');
    await this.voxCallService.loginAsync(currentUser.id, currentUser.id);
    console.log('Initiating call with Innovaspeak AI agent...');
    await this.voxCallService.callAsync(INNOVASPEAK_AI_AGENT_NUMBER);
    console.log('Call with Innovaspeak AI agent is established');
  }

  startCallTimer() {
    this.callStartTime = Date.now();
    this.callDuration$ = timer(0, 1000).pipe(
      map(() => {
        const elapsed = Date.now() - this.callStartTime; // milliseconds
        const hours = Math.floor(elapsed / 3600000).toString().padStart(2, '0');
        const minutes = Math.floor((elapsed % 3600000) / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
      }),
      takeWhile(() => this.isCallActive) // Stop updating when the call is no longer active
    );
  }

  startTalking() {
  }

  stopTalking() {
  }

  async ngOnDestroy() {
    await this.voxCallService?.hangUpAsync()
  }
}
