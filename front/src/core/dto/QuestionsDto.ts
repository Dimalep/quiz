export interface QuestionDto{
    value: string;
    description: string;
    time: Date;
    quiz: { id: number };
}