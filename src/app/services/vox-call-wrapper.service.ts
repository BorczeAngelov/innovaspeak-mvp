import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

    await this.connectAndLogin(username, password);
  }

  private async isClientConnected(): Promise<boolean> {
    const clientState = this.voxSdk.getClientState();
    return clientState === "CONNECTED" || clientState === "LOGGING_IN";
  }

  private async connectAndLogin(username: string, password: string): Promise<void> {
    try {
      await this.voxSdk.init({ micRequired: false });
      await this.voxSdk.connect();
      await this.login(username, password);
    } catch (error) {
      this.handleConnectionError(error);
    }
  }
  
  private async login(username: string, password: string): Promise<void> {
    try {
      const info = await this.voxSdk.login(username, password);
      console.log('Login successful', info);
    } catch (error) {
      console.error('Login error', error);
    }
  }

  private handleConnectionError(error: any): void {
    alert('Cannot connect to the VoxImplant cloud');
    console.warn('Cannot connect', error);
  }

  public async callAsync(number: string): Promise<void> {
    if (this.currentCall) {
      console.warn("There is already an ongoing call.");
      return;
    }

    await this.initiateCall(number);
  }

  private async initiateCall(number: string): Promise<void> {
    await this.voxSdk.setOperatorACDStatus(VoxImplant.OperatorACDStatuses.InService);
    this.currentCall = this.voxSdk.call(number);
    this.bindCallEvents();
  }

  public async hangUpAsync(): Promise<void> {
    if (!this.currentCall) {
      console.warn("No current call to hang up.");
      return;
    }

    await this.terminateCall();
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
        this.transcriptMessagesSubject.next([...this.transcriptMessagesSubject.value, 'AI Response Transcript: ' + messageData.data]);
      } else if (messageData.action === 'log_ai_request') {
        this.transcriptMessagesSubject.next([...this.transcriptMessagesSubject.value, 'AI Request Transcript: ' + messageData.data]);
      }
      
    } catch (error) {
      console.error('Error parsing AI message:', error);
    }
  }
}