export class AIAvatarModel {
    name: string;
    subtitle: string;
    imageUri: string;
    longText: string;

    constructor(name: string, subtitle: string, imageUri: string, longText: string) {
        this.name = name;
        this.subtitle = subtitle;
        this.imageUri = imageUri;
        this.longText = longText;
    }
}

export class GraceModel extends AIAvatarModel {    
  
    constructor() {
        const name = 'Grace';
        const subtitle = 'Daily Reflection AI Companion';
        const imageUri = 'assets/images/avatar-grace.jpg';
        const longText = 
        `Hi, I'm Grace, your Virtual AI Companion.
        Think of me as a friend who's always there to listen, understand, and guide you through a journey of self-discovery.
        With just a question, we'll dive deep into your day, exploring moments that made you smile or pause.
        Ready for a heart-to-heart? Let's talk about your day.`;

        super(name, subtitle, imageUri, longText);
    }
}

export function generateAvatarObjects(imageNames: string[]): AIAvatarModel[] {
    return imageNames.map(imageName => {
      const name = imageName.replace('avatar-', '').split('.')[0];
      const subtitle = 'Generic AI Companion';
      const imageUri = `assets/images/innova-avatars/${imageName}`;
      const longText = `Hi, I'm ${name}, your AI companion. Let's explore new ideas and insights together!`;
  
      return new AIAvatarModel(name, subtitle, imageUri, longText);
    });
}

export const GenericAvatarImages = [
    'Innova_M_001.jpg',
    'Innova_M_004.jpg',
    'Innova_F_003.jpg',
    'Innova_F_002.jpg',
    'Innova_M_002.jpg',
    'Innova_F_004.jpg',
    'Innova_F_005.jpg',
    'Innova_M_003.jpg',
    'Innova_F_006.jpg',
]