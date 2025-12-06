import type { QuestionDto } from "./QuestionDto";

export interface SlideItem {
    id: number;
    type: "question" | "settings";
    data?: QuestionDto;
}