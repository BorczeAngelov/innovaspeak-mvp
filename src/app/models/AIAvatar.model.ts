export interface Trait {
    label: string;
    value: number;
}

export class AIAvatarModel {
    name: string;
    subtitle: string;
    imageUri: string;
    longText: string;
    personalityTraits: Trait[];

    constructor(name: string, subtitle: string, imageUri: string, longText: string, personalityTraits: Trait[]) {
        this.name = name;
        this.subtitle = subtitle;
        this.imageUri = imageUri;
        this.longText = longText;
        this.personalityTraits = personalityTraits;
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

        // prompt for image
        // const longText = "As your Daily Reflection Companion, here's what I offer to you: Deep, Meaningful Conversations; Listening and Questioning; A Safe Space for Sharing; Guidance for Understanding and Growth; Positive Reflections; Personalized Conversations; A Positive and Supportive Environment. My goal is to make our conversations a rewarding experience for you, where you feel supported in exploring and understanding your day's events and emotions, leading to insightful reflections and a deeper understanding of yourself.";
        const personalityTraits = [
            { label: 'Empathy', value: 90 },
            { label: 'Guidance', value: 50 },
            { label: 'Personalized Engagement', value: 92 },
            { label: 'Supportiveness', value: 90 }
        ];

        super(name, subtitle, imageUri, longText, personalityTraits);
    }
}
