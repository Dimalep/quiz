import { useEffect, useRef, useState } from "react";
import type { Player } from "./usePlayer";
import * as signalR from "@microsoft/signalr";
import type { GameDTO } from "./useGame";

export default function useQuizHubPlayer(sessionKey?: string, player?: Player) {
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  const [players, setPlayers] = useState<Player[]>([]);
  const [connectedPlayer, setConnectedPlayer] = useState<Player | null>(null);
  const [currentGame, setCurrentGame] = useState<GameDTO>();

  useEffect(()=>{
    if(!sessionKey || !player) {
        console.log("Player sk or p is null");
        return;
    }

    const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5103/quizHub", { withCredentials: true })
            .withAutomaticReconnect()
            .build();

    connectionRef.current = connection;

    const start = async () => {
        try{
            await connection.start();
            await connection.invoke("ConnectToQuiz", sessionKey, player);
        }catch(err){
            console.log(err)
        };
    };

    connection.on("FirstConnect", (game: GameDTO) => {
        setCurrentGame(game);
        localStorage.setItem("currentGame", JSON.stringify(game));
    });

    connection.on("UserJoined", (player: Player, allPlayers: Player[]) => {
        setPlayers(allPlayers);
        setConnectedPlayer(player);
        console.log("Connected player: ", player);
    })

    connection.on("UserLeft", (player: Player, allPlayers: Player[]) => {
        setPlayers(allPlayers);
    });

    connection.on("GameLaunched", (game: GameDTO) => {
        setCurrentGame(game);
        localStorage.setItem("currentGame", JSON.stringify(game));
    });

    connection.on("GameCompleted", (game: GameDTO) => {
      setCurrentGame(game);
      localStorage.removeItem("currentGame");
    });

    connection.on("GameClose", (game: GameDTO) => {
        setCurrentGame(game);
        localStorage.setItem("currentGame", JSON.stringify(game));
    });

    connection.on("GameOpen", (game: GameDTO) => {
        setCurrentGame(game);
        localStorage.setItem("currentGame", JSON.stringify(game));
    });

    start();

    return () => {
        connection.off("UserJoined");
        connection.off("GameLaunched");
        connection.off("UserLeft");
        connection.off("GameCompleted");
        connection.off("GameOpen");
        connection.off("GameClose");
        connection.stop();
    }
  },[sessionKey, player]);

  return {
    connection: connectionRef.current,
    players,
    connectedPlayer,
    currentGame,
    setCurrentGame
  }
}
