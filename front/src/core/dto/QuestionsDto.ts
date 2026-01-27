// for main logic
export interface Answer{
    number: number;
    isCorrectly: boolean;
    text: string;
}

export interface Question {
    id: number;
    title: string;
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
