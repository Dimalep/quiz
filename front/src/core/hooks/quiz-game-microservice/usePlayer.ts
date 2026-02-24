export type Player = {
    id: number;
    nickname: string;
    role: string;
} 

export type AddPlayerRequest = {
    nickname: string;
    role: "admin" | "player";
    userId: number;
    quizSessionKey: string;
}

export default function usePlayer() {
  
  const getPlayerById = async (playerId: number) => {
    const response = await fetch(`${import.meta.env.VITE_QUIZ_GAME_ADDRESS}api/players/${playerId}`, {
        method: "GET",
        headers: {"Content-type": "application/json"}
    });

    if(!response.ok){
        console.log("Error get player by id");
        return;
    }

    const data: Player = await response.json();

    return data;
  };

  const addPlayer = async (role: string, sessionKey: string) => {
    const player: AddPlayerRequest = {
        nickname: role === "admin" ? "admin" : "player",
        role: role === "admin" ? "admin" : "player",
        userId: 0,
        quizSessionKey: sessionKey
    };

    const response = await fetch(`${import.meta.env.VITE_QUIZ_GAME_ADDRESS}api/players`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(player)
    });

    if(!response.ok){
        console.log("Error add player");
        return;
    }

    const data: Player = await response.json();
    return data;
  };

  return {addPlayer, getPlayerById}
}
