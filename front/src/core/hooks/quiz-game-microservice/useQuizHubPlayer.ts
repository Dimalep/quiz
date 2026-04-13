import { useEffect, useRef, useState } from "react";
import type { Player } from "./usePlayer";
import * as signalR from "@microsoft/signalr";
import type { GameDTO } from "./useGame";
import type { PlayerProgress } from "./useProgress";
import type { Question } from "../../../features/quiz-creation/manual-create/create-context/reducer";

export default function useQuizHubPlayer(sessionKey?: string, player?: Player) {
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  const [players, setPlayers] = useState<Player[]>([]);
  const [connectedPlayer, setConnectedPlayer] = useState<Player | null>(null);
  const [currentGame, setCurrentGame] = useState<GameDTO>();
  const [currentProgress, setCurrentProgress] = useState<PlayerProgress>();
  const [curQuestion, setCurQuestion] = useState<Question>();

  useEffect(() => {
    if(!currentGame) return;
    localStorage.setItem("currentGame", JSON.stringify(currentGame));
  }, [currentGame])

  useEffect(() => {
    if(!curQuestion) return;
    localStorage.setItem("currentQuestion", JSON.stringify(curQuestion))
  }, [curQuestion])

  useEffect(() => {
    const saved = localStorage.getItem("currentQuestion");
    if (!saved) return;

    try {
        const parsed = JSON.parse(saved);
        setCurQuestion(parsed);
    } catch {}
  }, []);

  useEffect(()=>{
    if(!sessionKey || !player) return;

    const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5103/quizHub", { withCredentials: true })
            .withAutomaticReconnect()
            .build();

    connectionRef.current = connection;

    connection.on("FirstConnect", (game: GameDTO) => {
        setCurrentGame(game);
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
    });

    connection.on("GameCompleted", (game: GameDTO) => {
      setCurrentGame(game);
    });

    connection.on("GameClose", (game: GameDTO) => {
        setCurrentGame(game);
    });

    connection.on("GameOpen", (game: GameDTO) => {
        setCurrentGame(game);
    });

    // First question
    connection.on("SetQuestion", (question: Question) => {
        console.log("Current question - ", question)
        setCurQuestion(question);
    });

    connection.on("ProgressUpdatedForPlayer", (progress: PlayerProgress) => {
        console.log("Current progress - ", progress);
        setCurrentProgress(progress);
    });

    connection.on("UpdatedPlayerCaller", (player: Player) => {
        localStorage.setItem("currentPlayer", JSON.stringify(player));
    });

    connection.on("UpdatedPlayers", (players: Player[]) => {
      setPlayers(players);
    });

    const start = async () => {
        try{
            await connection.start();
            await connection.invoke("ConnectToQuiz", sessionKey, player);
            await connection.invoke("CreateProgress", sessionKey, player.id);
        }catch(err){
            console.log(err)
        };
    };

    start();

    return () => {
        connection.off("UserJoined");
        connection.off("SetQuestion")
        connection.off("GameLaunched");
        connection.off("UserLeft");
        connection.off("GameCompleted");
        connection.off("GameOpen"); 
        connection.off("GameClose");
        connection.off("CompletedProgress");
        connection.off("ProgressUpdatedForPlayer");
        connection.stop();
    }
  },[sessionKey, player]);

  return {
    connection: connectionRef.current,
    players,
    connectedPlayer,
    currentGame,
    currentProgress,
    curQuestion,
    setCurrentProgress,
    setCurrentGame,
  }
}
