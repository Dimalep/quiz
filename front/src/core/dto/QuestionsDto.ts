export interface QuestionDto{
    value: string;
    description: string;
    time: Date;
    quizId: { id: number };
}