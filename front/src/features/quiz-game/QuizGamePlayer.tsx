import PlayerRoom from "./components/player-room/PlayerRoom";
import QuizGamePlayerContext from "./quiz-game-context/QuizGamePlayerContext";

export default function QuizGamePlayer() {
  return (
    <QuizGamePlayerContext>
      <PlayerRoom />
    </QuizGamePlayerContext>
  );
}
