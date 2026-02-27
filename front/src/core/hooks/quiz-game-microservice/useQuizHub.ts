import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import type { Player } from "./usePlayer";
import type { GameDTO } from "./useGame";


export default function useQuizHub(sessionKey?: string, currentPlayer?: Player) {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentQuizSession, setCurrentQuizSession] = useState<GameDTO>();

  //#region handlers 
  const startHandler = (quizSession: GameDTO, allPlayer: Player[]) => {
    setCurrentQuizSession({...quizSession});
    console.log("Game is started", quizSession);
    console.log("All players:", allPlayer);
  };
  const completeHandler = (quizSession: GameDTO, allPlayer: Player[]) => {
    setCurrentQuizSession({...quizSession})
    console.log("Game is complete", quizSession);
    console.log("All players:", allPlayer);
  };
  const joinHandler = (player: Player, allPlayers: Player[]) => {
    setPlayers(allPlayers);
    console.log("User joined", player);
  } 
  const leftHandler = (player: Player, allPlayer: Player[]) => {
    setPlayers(allPlayer);
    console.log("User left", player);
  }
  //#endregion 

  useEffect(() => {
    if(!sessionKey || !currentPlayer) return;

    const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5103/quizHub", { withCredentials: true })
        .withAutomaticReconnect()
        .build();

    connectionRef.current = connection;

    async function start() {
        try{
            await connection.start();
            await connection.invoke("ConnectToQuiz", sessionKey, currentPlayer);
            console.log("Conncted to quiz");
        }catch(er){
            console.error(er);
        }
    }
    
    connection.on("UserJoined", joinHandler);
    connection.on("UserLeft", leftHandler);
    connection.on("GameCompleted", completeHandler);
    connection.on("GameStarted", startHandler);

    start();

    return () => {
        connection.off("UserJoined", joinHandler);
        connection.off("UserLeft", leftHandler);
        connection.off("GameCompleted", completeHandler);
        connection.off("GameStarted", startHandler);
        connection.stop();
    }
  }, [sessionKey, currentPlayer])
  return {
    connection: connectionRef.current,
    players,
    currentQuizSession,
    setCurrentQuizSession
  }
}
