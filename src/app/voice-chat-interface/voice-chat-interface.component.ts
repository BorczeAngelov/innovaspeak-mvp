import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SharedImportedMatModule } from '../shared-imported-mat.module';
import { CurrentUserInfoService } from '../services/current-user-info.service';
import { VoxCallWrapperService } from '../services/vox-call-wrapper.service';
import { INNOVASPEAK_AI_AGENT_NUMBER } from '../services/PublicConfigValues';
import { CurrentUserInfo } from '../services/CurrentUserInfo';
import { Observable, interval, map, of, scan, takeWhile, timer } from 'rxjs';
import { GraceModel } from '../models/AIAvatar.model';
import { RealTimeCallTranscriptService } from '../services/real-time-call-transcript.service';


@Component({
  selector: 'app-voice-chat-interface',
  standalone: true,
  imports: [SharedImportedMatModule],
  templateUrl: './voice-chat-interface.component.html',
  styleUrl: './voice-chat-interface.component.css'
})
export class VoiceChatInterfaceComponent implements OnInit, OnDestroy {
  @ViewChild('messageContainer') messageContainer!: ElementRef;

  aiAvatar = new GraceModel();

  messages$!: Observable<{ author: string, text: Observable<string> }[]>;
  private messagesCache: { [key: string]: Observable<string> } = {};

  isCallStarted: boolean = false;
  callDuration$!: Observable<string>;
  callStartTime!: number;
  isCallActive = false;
  callStatus = 'speaking';

  currentIndex: number = 0;
  private intervalId: any;

  constructor(
    private currentUserInfoService: CurrentUserInfoService,
    private voxCallService: VoxCallWrapperService,
    private realTimeCallTranscriptService: RealTimeCallTranscriptService) { }

  async ngOnInit(): Promise<void> {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % 5;
    }, 10000); // Rotate every 10 seconds
  }

  async startEmulatedCall() {
    this.messages$ = interval(2000).pipe(
      scan((acc, val) => {
        const author = val % 2 === 0 ? 'User' : 'Grace';
        const text = `This is a message from ${author} number ${val}`;
        // Apply the typing effect to each new message
        const textWithEffect$ = this.realTimeCallTranscriptService.simulateTypingEffect(text);
        return [{ author, text: textWithEffect$ }, ...acc];
      }, [] as { author: string; text: Observable<string> }[])
    );

    this.isCallStarted = true;
    this.isCallActive = true;
    this.startCallTimer();
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

    this.voxCallService.transcriptMessages$.pipe(
      scan((acc, messages) => {
        const newMessages = messages.filter(message => !acc.find(cachedMessage => cachedMessage.rawText === message));

        newMessages.forEach(message => {
          const [author, text] = message.split(':');
          const messageKey = `message_${Object.keys(this.messagesCache).length + 1}`;
          this.messagesCache[messageKey] = this.realTimeCallTranscriptService.simulateTypingEffect(text);
          acc.unshift({ author, text: this.messagesCache[messageKey], rawText: message });
        });
        return acc;
      }, [] as { author: string; text: Observable<string>; rawText: string }[])
    ).subscribe(processedMessages => {
      this.messages$ = of(processedMessages);
      this.scrollToTop();
    });

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
    await this.voxCallService?.hangUpAsync();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  scrollToTop(): void {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }
}