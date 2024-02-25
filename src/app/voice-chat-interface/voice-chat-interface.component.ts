import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedImportedMatModule } from '../shared-imported-mat.module';
import { CurrentUserInfoService } from '../services/current-user-info.service';
import { VoxCallWrapperService } from '../services/vox-call-wrapper.service';
import { INNOVASPEAK_AI_AGENT_NUMBER } from '../services/PublicConfigValues';
import { CurrentUserInfo } from '../services/CurrentUserInfo';
import { Observable, interval, map, scan, takeWhile, timer } from 'rxjs';
import { GraceModel } from '../models/AIAvatar.model';

import { trigger, transition, style, animate, query, stagger, animation, useAnimation } from '@angular/animations';

const wordAnimation = animation([
  style({ opacity: 0, transform: 'translateY(-20px)' }),
  animate('{{delay}}ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
]);

@Component({
  selector: 'app-voice-chat-interface',
  standalone: true,
  imports: [SharedImportedMatModule],
  templateUrl: './voice-chat-interface.component.html',
  styleUrl: './voice-chat-interface.component.css',
  animations: [
    trigger('wordAnimation', [
      transition(':enter', useAnimation(wordAnimation))
    ]),
    trigger('fadeInEffect', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('{{delay}}ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
    trigger('slideInEffect', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('{{delay}}ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
    ]),
    trigger('scalingEffect', [
      transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate('{{delay}}ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
    ]),
    trigger('rotatingEffect', [
      transition(':enter', [
        style({ transform: 'rotateX(-90deg)', opacity: 0 }),
        animate('{{delay}}ms ease-out', style({ transform: 'rotateX(0)', opacity: 1 }))
      ]),
    ]),
    trigger('blurToFocusEffect', [
      transition(':enter', [
        style({ filter: 'blur(4px)', opacity: 0 }),
        animate('{{delay}}ms ease-out', style({ filter: 'blur(0)', opacity: 1 }))
      ]),
    ]),
    trigger('colorTransitionEffect', [
      transition(':enter', [
        style({ color: 'transparent' }),
        animate('{{delay}}ms ease-out', style({ color: '*' })) // Assuming final color is set in CSS
      ]),
    ]),

  ]
})
export class VoiceChatInterfaceComponent implements OnInit, OnDestroy {

  aiAvatar= new GraceModel();

  messages$!: Observable<{ author: string, words: string[] }[]>;

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

  async startEmulatedCull(){
    this.messages$ = interval(2000).pipe(
      scan((acc, val) => {

        const author = val % 2 === 0 ? 'User' : 'Grace';
        let text = `This is a message from ${author} number ${val}`;
        text = text +text +text +text;

        const words = text.trim().split(' ').map(word => `${word} `); // Split into words and add a trailing space
        

        return [...acc, { author,  words }];
      }, [] as { author: string, words: string[] }[]),
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
    this.messages$ = this.voxCallService.transcriptMessages$.pipe(
      map(messages => messages.map(message => {
        const [author, text] = message.split(':');
        const words = text.trim().split(' ').map((word: any) => `${word} `);
        return { author, words };
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
