export type Player = {
    id: number;
    nickname: string;
    role: string;
} 

export type AddPlayerRequest = {
    nickname: string;
    role: string;
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
    const userId = Number(localStorage.getItem("userId"));
    if(!userId){
        console.error("Error userId is undefined");
        return;
    }

    const player: AddPlayerRequest = {
        nickname: role,
        role: role,
        userId: userId,
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
