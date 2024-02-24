import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedImportedMatModule } from '../shared-imported-mat.module';
import { CurrentUserInfoService } from '../services/current-user-info.service';
import { VoxCallWrapperService } from '../services/vox-call-wrapper.service';
import { INNOVASPEAK_AI_AGENT_NUMBER } from '../services/PublicConfigValues';
import { CurrentUserInfo } from '../services/CurrentUserInfo';

@Component({
  selector: 'app-voice-chat-interface',
  standalone: true,
  imports: [SharedImportedMatModule],
  templateUrl: './voice-chat-interface.component.html',
  styleUrl: './voice-chat-interface.component.css'
})
export class VoiceChatInterfaceComponent implements OnInit, OnDestroy {

  messages: { author: string, text: string }[] = [];
  callStatus = 'speaking';

  constructor(
    private currentUserInfoService: CurrentUserInfoService,
    private voxCallService: VoxCallWrapperService) { }

  async ngOnInit(): Promise<void> {
    console.log('VoiceChatInterfaceComponent: Initializing component and fetching current user info...');

    try {
      const currentUser = await this.currentUserInfoService.getCurrentUserInfo();
      if (!currentUser || !currentUser.id) {
        console.error('Failed to obtain current user information or user ID.');
        return;
      }

      await this.InitializeVox(currentUser);
    } catch (error) {
      console.error('VoiceChatInterfaceComponent: An error occurred during component initialization:', error);
    }
  }

  private async InitializeVox(currentUser: CurrentUserInfo) {
    this.voxCallService.transcriptMessages$.subscribe(messages => {
      // temp code
      this.messages = messages.map(message => {
        const [author, ...textParts] = message.split(':'); // Split by ':' and handle multiple colons in text
        const text = textParts.join(':'); // Rejoin the text parts in case the text itself contains colons
        return { author, text };
      });
    });

    console.log('Logging in to VoxCall service...');
    await this.voxCallService.loginAsync(currentUser.id, currentUser.id);
    console.log('Initiating call with Innovaspeak AI agent...');
    await this.voxCallService.callAsync(INNOVASPEAK_AI_AGENT_NUMBER);
    console.log('Call with Innovaspeak AI agent is established');
  }

  startTalking() {
  }

  stopTalking() {
  }

  async ngOnDestroy() {
    await this.voxCallService?.hangUpAsync()
  }
}
