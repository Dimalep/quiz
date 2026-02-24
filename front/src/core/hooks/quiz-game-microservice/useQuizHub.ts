import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import type { Player } from "./usePlayer";


export default function useQuizHub(sessionKey?: string, currentPlayer?: Player) {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

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
    
    const joinHandler = (player: Player, allPlayers: Player[]) => {
        setPlayers(allPlayers);
        console.log("User joined", player);
    } 
    const ledtHandler = (player: Player, allPlayer: Player[]) => {
        setPlayers(allPlayer);
        console.log("User left", player);
    }

    connection.on("UserJoined", joinHandler);
    connection.on("UserLeft", ledtHandler);

    start();

    return () => {
        connection.off("UserJoined", joinHandler);
        connection.off("UserLeft", ledtHandler);
        connection.stop();
    }
  }, [sessionKey, currentPlayer])
  return {
    connection: connectionRef.current,
    players
  }
}
