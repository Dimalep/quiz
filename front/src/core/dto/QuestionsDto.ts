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
    questions: Question[];
}


// for frontend
export interface QuestionSlide{
    number: number;
    type: number;
    isSaved: boolean;
    question: Question;
}