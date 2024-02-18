import { Component } from '@angular/core';
import { SharedImportedMatModule } from '../shared-imported-mat.module';

@Component({
  selector: 'app-voice-chat-interface',
  standalone: true,
  imports: [SharedImportedMatModule],
  templateUrl: './voice-chat-interface.component.html',
  styleUrl: './voice-chat-interface.component.css'
})
export class VoiceChatInterfaceComponent {
  
  messages: {author: string, text: string}[] = [
    { author: 'You', text: 'How is the weather today?' },
    { author: 'Jane Doe', text: 'It is quite sunny, actually.' }
    // Initial conversation messages
  ];

  constructor() { }

  ngOnInit(): void {
  }

  startTalking(): void {
    // Simulate adding a message when the user starts talking
    console.log('User starts talking');
    // Here you would implement actual voice capture and processing
  }

  stopTalking(): void {
    // Simulate stopping the talk and potentially adding the transcribed message
    console.log('User stops talking');
    // Simulate adding a transcribed message
    this.messages.push({ author: 'You', text: 'This is a simulated message after talking.' });
  }
}
