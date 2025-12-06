import type { Question } from "./Questoin";

export interface QuizDto{
    id: number;
    title?: string;
    description?: string;
    tag?: string;
    questions: Question[]
}