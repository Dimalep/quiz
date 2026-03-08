import type { Player } from "./usePlayer";

export interface Progress {
  id: number;
  playerId: number;
  sessionId: number;
  currentQuestionIndex: number;
  startAt: string;
  completeAt: string;
  quizResult: PlayerQuizResult;
  status: number;
}

export interface PlayerQuizResult {
  quizId: number;
  quantityCorrectAnswers: number;
  questions: QuestionResult[];
}

export interface QuestionResult {
  questionIndex: number;
  questionText: string;
  answers: AnswerResult[]
}

export interface AnswerResult{
  answerIndex: number;
  answerText: string;
  isCorrect: boolean;
}

export interface ProgressDTO {
  id: number;
  player: Player;
  sessionId: number;
  currentQuestionIndex: number;
  startAt: string;
  completeAt: string;
  status: number;
  quantityCorrectAnswers: number;
}

export interface ProgressForAdmin
{
  player: Player
  quantityRemainedQuestions: number;
  quantityCorrectAnswers: number;
  currentQuestionIndex: number;
  status: number;
}

export interface ProgressForPlayer{
  progressId: number;
  currentQuestionIndex: number;
  QuantityQuestions: number;
  QuantityCompletedQuestions: number;
  status: number;
}

export default function useProgress() {
  const getProgressById = async (progressId: number) => {
    const response = await fetch(`${import.meta.env.VITE_QUIZ_GAME_ADDRESS}api/progresses/${progressId}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });

    if(!response.ok){
      console.log("Error get progress by id");
      return;
    }

    const data: Progress = await response.json();

    return data;
  };

  return {getProgressById}
}
