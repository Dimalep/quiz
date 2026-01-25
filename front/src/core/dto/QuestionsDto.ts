// for main logic
export interface Answer{
    isCorrectly: boolean;
    text: string;
}

export interface Question {
    id: number;
    title: number;
    answers: Answer[];
}

export interface Quiz{
    id: number;
    title: string;
    description: string;
    slides: Slide[];
}

// for frontend
export interface Slide{
    number: number;
    type: number;
    isSaved: boolean;
    question?: Question;
}
