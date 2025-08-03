export interface Answer {
    id: number;
    numA: number;
    value: string;
    isCorrect: boolean;
    question_id?: number;
}