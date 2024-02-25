import { Component } from '@angular/core';
import { VoiceChatInterfaceComponent } from '../voice-chat-interface/voice-chat-interface.component';
import { SharedImportedMatModule } from '../shared-imported-mat.module';

@Component({
  selector: 'app-browser-home',
  standalone: true,
  imports: [SharedImportedMatModule, VoiceChatInterfaceComponent],
  templateUrl: './browser-home.component.html',
  styleUrl: './browser-home.component.css'
})
export class BrowserHomeComponent {

  isSidenavOpen = false;
  avatars = [
    {
      name: 'Grace, the Gratitude Guide',
      description: 'Embark on daily reflection with me. AI-driven questions for mindfulness and personal growth…',
    },
    {
      name: 'Felix, The Focus Mentor',
      description: 'I`ll guide you in setting priorities, optimizing tasks, and staying on track for success…',
    },
    {
      name: 'Vox, The Interview Virtuoso',
      description: 'Master interviews with me. I simulate scenarios, and prepare you for success…',
    },
    {
      name: 'Lingua, The Fluency Facilitator',
      description: 'I offer personalized language practice, instant feedback, and guidance for mastering fluency…',
    }
  ];


  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  selectAvatar(index: any, avatar: any) {
    return avatar ? avatar.id : undefined;
  }
}
