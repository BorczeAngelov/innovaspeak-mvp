import { Component, OnInit } from '@angular/core';
import { VoiceChatInterfaceComponent } from '../voice-chat-interface/voice-chat-interface.component';
import { SharedImportedMatModule } from '../shared-imported-mat.module';
import { AIAvatarModel, generateAvatarObjects, GraceModel } from '../models/AIAvatar.model';

@Component({
  selector: 'app-browser-home',
  standalone: true,
  imports: [SharedImportedMatModule, VoiceChatInterfaceComponent],
  templateUrl: './browser-home.component.html',
  styleUrl: './browser-home.component.css'
})
export class BrowserHomeComponent implements OnInit {

  isSidenavOpen = false;
  avatars: AIAvatarModel[] = [];
  selectedAvatar!: AIAvatarModel;

  constructor() { }

  ngOnInit(): void {
    var grace = new GraceModel();
    this.avatars = [grace, ...generateAvatarObjects()];
    this.selectedAvatar = grace;
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  trackByFn(index: number, avatar: AIAvatarModel): any {
    return avatar.name;
  }

  selectAvatar(avatar: AIAvatarModel): void {
    this.selectedAvatar = avatar;
    this.toggleSidenav()
  }
}
