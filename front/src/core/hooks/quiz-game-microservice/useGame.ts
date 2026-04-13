import type { QuizDTO } from "../quiz-creation-microservice/useQuizApi";
import useAuth from "../user-service-microservice/useAuth";

export type GameDTO = {
    id: number;
    sessionKey: string;
    status: number;
    quizId: number;
    userId: number;
}

export default function useGame() {
  const {fetchWithAuth} = useAuth();

  const getGamesByUserId = async () : Promise<GameDTO[] | undefined> => {
    const rowUserId = localStorage.getItem("userId");
    if(!rowUserId) return; 

    const response = await fetchWithAuth(`${import.meta.env.VITE_QUIZ_GAME_ADDRESS}api/games/userid=${Number(rowUserId)}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });

    if(!response){
      console.log("Error get games by user id");
      return;
    }

    const data: GameDTO[] = await response.json();
    return data;
  };

  const getGameByQuizIdAndUserId = async (quizId: number) : Promise<GameDTO | undefined> => {
    const rowUserId = localStorage.getItem("userId");
    if(rowUserId === null){
      console.log("Error get userId from localstorage");
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_QUIZ_GAME_ADDRESS}api/games/quizid=${quizId}/userid=${Number(rowUserId)}`, {
      method: "GET",
      headers: {"Content-Type":"application/json"}
    });

    if(!response.ok){
      console.log("Error get game by quizId and userId");
      return;
    }

    const game: GameDTO = await response.json();
    return game;
  }

  const getGameBySessionKey = async (sessionKey: string) : Promise<GameDTO | undefined>=> {
    const response = await fetch(`http://localhost:5103/api/games/${sessionKey}`,{
        method: "GET",
        headers: {"Content-type": "application/json"}
    });

    if(!response.ok){
        console.log("Error get quiz session by session key");
        return;
    }

    const data: GameDTO = await response.json();

    return data;
  };

  const addGame = async (quizId: number) : Promise<GameDTO | undefined>=> {
    const rowUserId = localStorage.getItem("userId");
    if(rowUserId === null){
      console.log("Error get userId from localstorage");
      return;
    }

    const response = await fetch(`http://localhost:5103/api/games/quizid=${quizId}/userid=${Number(rowUserId)}`,{
        method: "POST",
        headers: {"Content-type": "application/json"}
    });

    if(!response.ok){
        console.log("Error add quiz session");
        return;
    }

    const data: GameDTO = await response.json();
    return data;
  };

  const initialGame = async (quizId: number) : Promise<GameDTO | undefined> => {
    // Getting current user id 
    const rowUserId = localStorage.getItem("userId");
    const userId = Number(rowUserId);

    if(rowUserId === null){
      console.log("Error get userId from localstorage");
      return undefined;
    }

    // Fetch
    const response = await fetch(`http://localhost:5103/api/games/init/${quizId}/${userId}`,{
        method: "POST",
        headers: {"Content-type": "application/json"}
    });

    if(!response.ok){
      console.log("Error initial game");
      return undefined;
    }

    const data = await response.json();
    return data;
  }

  return { addGame, getGameBySessionKey, getGameByQuizIdAndUserId, getGamesByUserId, initialGame}
}