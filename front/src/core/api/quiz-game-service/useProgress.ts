import type { Question } from "../../../features/quiz-creation/manual-create/create-context/reducer";
import type { Player } from "./usePlayer";

export interface Progress {
  id: number;
  playerId: number;
  GameId: number;
  currentQuestionIndex: number;
  startAt: string;
  completeAt: string;
  quizResult: PlayerQuizResult;
  // status: number;
  status: string;
}

export interface PlayerQuizResult {
  quizId: number;
  quantityCorrectAnswers: number;
  questions: QuestionResult[];
}

export interface QuestionResult {
  id: string;
  questionIndex: number;
  questionText: string;
  answers: AnswerResult[]
}

export interface AnswerResult{
  id: string;
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
  status: string;
  quantityCorrectAnswers: number;
}

export interface ProgressForPlayer{
  progressId: number;
  currentQuestionIndex: number;
  QuantityQuestions: number;
  QuantityCompletedQuestions: number;
  status: string;
}

export interface ProgressPlayer{
  id: number;
}


// new
export interface ProgressForAdmin
{
  player: Player
  quantityRemainedQuestions: number;
  quantityCorrectAnswers: number;
  currentQuestionIndex: number;
  quantityAnsweredQuestions: number;
  status: string;
}

export interface CurrentPlayerProgress{
  question: Question;
  progress: Progress;
}

export type PlayerProgress = {
  id: number;
  status: string;
  questionResultHistory?: QuestionResultHistory[];
};

export type QuestionResultHistory = {
  id: string;
  answerResultHistory?: AnswerResultHistory[];
};

export type AnswerResultHistory = {
  id: string;
  text?: string;
};

export default function useProgress() {
  const getProgressByPlayerIdAndGameId = async (playerId: number, gameId: number) : Promise<Progress | undefined> => {
    const response = await fetch(`${import.meta.env.VITE_QUIZ_GAME_ADDRESS}api/progresses/player_id=${playerId}/game_id=${gameId}}`, {
      method: "GET",
      headers: {"Content-Type":"application/json"}
    });

    if(!response.ok){
      console.log("Error get progress by player id and game id");
      return;
    }

    const data = await response.json();
    return data;
  }

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
    const response = await fetch(`${import.meta.env.VITE_QUIZ_GAME_ADDRESS}api/progresses/session_key=${sessionKey}`,{
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

  return {getProgressById, getProgressesBySessionKey, getProgressByPlayerIdAndGameId}
}
