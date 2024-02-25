import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealTimeCallTranscriptService {

  constructor() { }

  // 20 characters per seconds is perfect
  simulateTypingEffect(message: string, charactersPerSecond: number = 20): Observable<string> {
    const millisecondsPerCharacter = 1000 / charactersPerSecond;
  
    return new Observable<string>(observer => {
      let currentText = '';
      const totalLength = message.length;
      let currentIndex = 0;
  
      const typingInterval = setInterval(() => {
        currentText += message.charAt(currentIndex);
        observer.next(currentText);
        currentIndex++;
  
        if (currentIndex >= totalLength) {
          clearInterval(typingInterval);
          observer.complete();
        }
      }, millisecondsPerCharacter);
    });
  }
}
