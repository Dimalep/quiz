export interface QuizSession{
    id: number,
    token: string,
    startAt: string,
    finishAt: string,
    status: string,
    userId?: {id: number},
    quizId: {id: number},

}