import { useEffect, useRef, useState } from "react"
import * as signalR from "@microsoft/signalr";
import type { Player } from "./usePlayer";
import type { GameDTO } from "./useGame";
import type { Progress, ProgressDTO } from "./useProgress";

export default function useQuizHubAdmin(sessionKey?: string, admin?: Player) {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  
  const [currentGame, setCurrentGame] = useState<GameDTO>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [progresses, setProgresses] = useState<ProgressDTO[]>([]);

  useEffect(()=>{
    if(!sessionKey || !admin){
      console.log(sessionKey);
      console.log(admin);
      console.log("Error: sesion or admin is null");
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
        await connection.invoke("ConnectToQuiz", sessionKey, admin);
      }catch(err){
        console.log(err);
      }
    }
    
    connection.on("UserJoined", (player: Player, allPlayers: Player[]) => {
      setPlayers(allPlayers);
      console.log("Connected player: ", player);
    });

    connection.on("UserLeft", (player: Player, allPlayer: Player[]) => {
      setPlayers(allPlayer);
    })

    connection.on("GameLaunched", (game: GameDTO) => {
      setCurrentGame(game);
      console.log("Current game: ", game);
    });

    connection.on("ProgressUpdatedForAdmin", (progresses: ProgressDTO[]) => {
      setProgresses(progresses);
      console.log("Progresses: ", progresses);
    })

    connection.on("GameCompleted", (game: GameDTO) => {
      setCurrentGame(game);
    });

    connection.on("GameOpen", (game: GameDTO) => {
      setCurrentGame(game);
    });

    connection.on("GameClose", (game: GameDTO) => {
      setCurrentGame(game);
    });

    start();
    return() => {
      connection.off("UserJoined");
      connection.off("ProgressUpdatedForAdmin");
      connection.off("GameLaunched");
      connection.off("GameCompleted");
      connection.off("UserLeft");
      connection.stop();
    }
  },[sessionKey, admin])

  return {
    connection: connectionRef.current,
    players,
    currentGame,
    setCurrentGame,
    progresses
  }
}
