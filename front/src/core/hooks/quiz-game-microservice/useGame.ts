export type GameDTO = {
    id: number;
    sessionKey: string;
    status: number;
    quizId: number;
}

export default function useGame() {

  const getGameBySessionKey = async (sessionKey: string) : Promise<GameDTO | undefined>=> {
    const response = await fetch(`http://localhost:5103/api/quiz-sessions/${sessionKey}`,{
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
    const response = await fetch(`http://localhost:5103/api/quiz-sessions/${quizId}`,{
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

  const startQuizSession = async () => {
    //
  };

  return {addQuizSession: addGame, startQuizSession, getGameBySessionKey}
}