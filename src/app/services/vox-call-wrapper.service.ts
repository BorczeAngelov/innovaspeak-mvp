import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INNOVASPEAK_VOX_PROXY_PROJECT_DOMAIN } from './PublicConfigValues';

declare var VoxImplant: any; // will be loaded from index.html with line <script src="https://unpkg.com/voximplant-websdk"></script>

@Injectable({
  providedIn: 'root'
})
export class VoxCallWrapperService {

  private voxSdk: any;
  private currentCall: any = null;
  private transcriptMessagesSubject = new BehaviorSubject<any[]>([]);
  public transcriptMessages$ = this.transcriptMessagesSubject.asObservable();

  constructor() {
    this.voxSdk = VoxImplant.getInstance();
  }

  public async loginAsync(username: string, password: string): Promise<void> {
    if (await this.isClientConnected()) {
      alert('Already logged in!');
      return;
    }

    var fullUserName = username + INNOVASPEAK_VOX_PROXY_PROJECT_DOMAIN;
    await this.connectAndLogin(fullUserName, password);
  }

  public async callAsync(number: string): Promise<void> {
    if (this.currentCall) {
      console.warn("There is already an ongoing call.");
      return;
    }

    await this.initiateCall(number);
  }

  public async hangUpAsync(): Promise<void> {
    if (!this.currentCall) {
      console.warn("No current call to hang up.");
      return;
    }

    await this.terminateCall();
  }

  private async isClientConnected(): Promise<boolean> {
    const clientState = this.voxSdk.getClientState();
    return clientState === "CONNECTED" || clientState === "LOGGING_IN";
  }

  private async connectAndLogin(fullUserName: string, password: string): Promise<void> {
    try {
      await this.voxSdk.init({ micRequired: false });
      await this.voxSdk.connect();
      await this.login(fullUserName, password);
    } catch (error) {
      this.handleConnectionError(error);
    }
  }
  
  private async login(fullUserName: string, password: string): Promise<void> {
    try {
      const info = await this.voxSdk.login(fullUserName, password);
      console.log('Login successful', info);
    } catch (error) {
      console.error('Login error', error);
    }
  }

  private handleConnectionError(error: any): void {
    alert('Cannot connect to the VoxImplant cloud');
    console.warn('Cannot connect', error);
  }

  private async initiateCall(number: string): Promise<void> {
    await this.voxSdk.setOperatorACDStatus(VoxImplant.OperatorACDStatuses.InService);
    this.currentCall = this.voxSdk.call(number);
    this.bindCallEvents();
  }

  private async terminateCall(): Promise<void> {
    await this.currentCall.hangup();
    this.currentCall = null;
    await this.resetACDStatus();
  }

  private async resetACDStatus(): Promise<void> {
    await this.voxSdk.setOperatorACDStatus(VoxImplant.OperatorACDStatuses.Online);
    setTimeout(() => this.voxSdk.setOperatorACDStatus(VoxImplant.OperatorACDStatuses.Ready), 400);
  }

  private bindCallEvents(): void {
    if (!this.currentCall) {
      console.warn("No current call to attach event listener.");
      return;
    }

    this.currentCall.on(VoxImplant.CallEvents.Connected, () => this.onConnect());
    this.currentCall.on(VoxImplant.CallEvents.Failed, () => this.onCallFailed());
    this.currentCall.on(VoxImplant.CallEvents.Disconnected, () => this.onCallDisconnected());
    this.currentCall.on(VoxImplant.CallEvents.MessageReceived, (event: any) => this.onMessageReceived(event));
  }

  private onConnect(): void {
    this.voxSdk.setOperatorACDStatus(VoxImplant.OperatorACDStatuses.InService);
  }

  private onCallDisconnected(): void {
    this.hangUpAsync(); // Optionally, trigger additional cleanup or UI updates via callbacks
  }

  private onCallFailed(): void {
    this.hangUpAsync(); // Optionally, handle call failure specifics
  }

  private onMessageReceived(event: any): void {
    try {
      const messageData = JSON.parse(event.text);

      if (messageData.action === 'log_ai_response') {
        this.transcriptMessagesSubject.next([...this.transcriptMessagesSubject.value, 'Grace: ' + messageData.data]);
      } else if (messageData.action === 'log_ai_request') {
        this.transcriptMessagesSubject.next([...this.transcriptMessagesSubject.value, 'User: ' + messageData.data]);
      }
      
    } catch (error) {
      console.error('Error parsing AI message:', error);
    }
  }
}