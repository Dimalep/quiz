export interface QuestionDto {
    id: number,
    title?: string, 
    correctAnswer?: string,
    answers?: string[]

    value?: string;
}