import useAuth from "../user-service-microservice/useAuth";
import type { Player } from "./usePlayer";

export interface Progress {
  id: number;
  playerId: number;
  GameId: number;
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
  GameId: number;
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
  const {fetchWithAuth} = useAuth();

  const getProgressById = async (progressId: number) => {
    const response = await fetch(`${import.meta.env.VITE_QUIZ_GAME_ADDRESS}api/progresses/progress_id=${progressId}`, {
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

  const getProgressesBySessionKey = async (sessionKey: string) : Promise<ProgressForAdmin[] | undefined>=> {
    const response = await fetchWithAuth(`${import.meta.env.VITE_QUIZ_GAME_ADDRESS}api/progresses/session_key=${sessionKey}`,{
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });

    
    if (!response) {
      console.log("Error get progresses by session key: no response");
      return undefined;
    }

    if (!response.ok) {
      console.log("Error get progresses by session key:", response.status);
      return undefined;
    }

    const progresses = await response.json();

    return progresses;
  };

  return {getProgressById, getProgressesBySessionKey}
}
