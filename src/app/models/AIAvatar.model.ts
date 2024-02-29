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

export function generateAvatarObjects(): AIAvatarModel[] {
    const avatarDetails = [
        { imageName: 'Innova_M_004.jpg', name: 'Ethan', subtitle: 'Interview Prep Mentor', longText: `Hi, I'm Ethan, your Interview Prep Mentor. Consider me your strategist for navigating the interview landscape. Together, we'll craft compelling responses and polish your presentation skills to showcase the best version of you. Excited to make a lasting impression? Let's begin.` },
        { imageName: 'Innova_M_001.jpg', name: 'Leo', subtitle: 'Public Speaking Coach', longText: `Hey there, I'm Leo, your Public Speaking Coach. Envision me as the ally in your journey to captivating audiences. With tailored feedback on clarity, pacing, and engagement, we'll ensure your voice is heard loud and clear. Ready to inspire? Let's start speaking!` },
        { imageName: 'Innova_F_003.jpg', name: 'Mia', subtitle: 'Language Learning Companion', longText: `Hi, I'm Mia, your dedicated Language Learning Companion. Imagine me as your personal guide on the path to mastering a new language. Together, we'll tackle pronunciation, grammar, and conversational skills, making each session interactive and fun. Ready to break language barriers? Let's dive in!` },
        { imageName: 'Innova_M_003.jpg', name: 'Max', subtitle: 'Critical Thinking Catalyst', longText: `Hi, I'm Max, your Critical Thinking Catalyst. Envision me as your challenger, pushing you to question, analyze, and think deeper. Together, we'll unlock your intellectual potential and solve puzzles with logic and creativity. Ready to stretch your mind? Let's engage.` },
        { imageName: 'Innova_F_002.jpg', name: 'Sophia', subtitle: 'Entertainment Storyteller', longText: `Greetings, I'm Sophia, your Entertainment Storyteller. Imagine me as the narrator of your next adventure, where your choices shape the story. Ready to be the protagonist in a world of interactive tales? Let the journey begin!` },
        { imageName: 'Innova_M_002.jpg', name: 'Alex', subtitle: 'Hobby Enthusiast', longText: `Hello, I'm Alex, your go-to Hobby Enthusiast. Picture me as your guide to diving deeper into your passions, from music and art to literature and beyond. Ready to explore new horizons and share your world? Let's discover together.` },
        { imageName: 'Innova_F_004.jpg', name: 'Eva', subtitle: 'Educational Tutor', longText: `Hello, I'm Eva, your Educational Tutor. Think of me as your partner in uncovering the wonders of knowledge. From complex theories to intriguing subjects, I'm here to make learning an adventure. Curious about the world? Let's explore it together.` },
        { imageName: 'Innova_F_005.jpg', name: 'Lina', subtitle: 'Adventure Curator', longText: `Hi, I'm Lina, your Adventure Curator. Imagine me as your companion in discovering new experiences and challenges. Together, we'll embark on quests that test your limits, learn new skills, and explore the unknown. Whether it's virtual exploration or real-world adventures, I'm here to make each journey unforgettable. Ready for adventure? Let's set forth into the great beyond.` },
        { imageName: 'Innova_F_006.jpg', name: 'Ivy', subtitle: 'Creative Writing Coach', longText: `Hello, I'm Ivy, your Creative Writing Coach. Picture me as your guide through the realms of imagination and expression. Together, we'll explore the art of storytelling, character creation, and narrative development. Whether you're penning your first novel or looking to refine your poetic voice, I'm here to support your literary journey. Ready to unlock the stories within you? Let's start writing.` },
    ];

    return avatarDetails.map(({ imageName, name, subtitle, longText }) => {
        const imageUri = `assets/images/innova-avatars/${imageName}`;
        return new AIAvatarModel(name, subtitle, imageUri, longText);
    });
}