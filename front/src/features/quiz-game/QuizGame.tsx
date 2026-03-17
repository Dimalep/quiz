// import { useState } from "react";
// import type { Player } from "../../core/hooks/quiz-game-microservice/usePlayer";
// import QuizGamePlayerContext from "./quiz-game-context/QuizGamePlayerContext";
// import QuizGameAdminContext from "./quiz-game-context/QuizGameAdminContext";
// import PlayerRoom from "./components/player-room/PlayerRoom";
// import AdminRoom from "./components/admin-room/AdminRoom";

// export default function QuizGame() {
//   const [player] = useState<Player | null>(() => {
//     const data = localStorage.getItem("player");
//     if (!data) return null;

//     try {
//       return JSON.parse(data) as Player;
//     } catch {
//       return null;
//     }
//   });

//   if (player?.role === "player") {
//     return (
//       <QuizGamePlayerContext>
//         <PlayerRoom />
//       </QuizGamePlayerContext>
//     );
//   } else if (player?.role === "admin") {
//     return (
//       <QuizGameAdminContext>
//         <AdminRoom />
//       </QuizGameAdminContext>
//     );
//   } else {
//     return (
//       <div>
//         <h1>Error loading player</h1>
//       </div>
//     );
//   }
// }
