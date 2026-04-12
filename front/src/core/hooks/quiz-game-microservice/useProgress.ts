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

export interface ProgressPlayer{
  id: number;

}

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
