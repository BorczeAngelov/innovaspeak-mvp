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
        const subtitle = 'Your Daily Reflection Companion';
        const imageUri = 'assets/images/avatar-grace.jpg';
        const longText = "As your Daily Reflection Companion, I am dedicated to offering you an experience that encompasses deep and meaningful conversations. Through attentive listening and thoughtful questioning, I provide a safe space for you to share your thoughts and feelings. My approach includes guiding you towards understanding and growth, ensuring that our interactions are filled with positive reflections. Each conversation is personalized to meet your unique needs, all within a positive and supportive environment. My ultimate goal is to make our conversations a rewarding experience for you, where you feel supported as we explore and understand the day's events and emotions together. This journey will lead to insightful reflections and a deeper understanding of yourself.";
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
