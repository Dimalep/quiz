export interface Question{
    id?: number;
    tmpid: number;
    numQ: number;
    value: string;
    description?: string;
    time?: Date;
    quizId: number;
}