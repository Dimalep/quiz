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
  questionId: number;
  question: string;
  answerId: number;
  answer: string;
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

export default function useProgress() {
  return {}
}
