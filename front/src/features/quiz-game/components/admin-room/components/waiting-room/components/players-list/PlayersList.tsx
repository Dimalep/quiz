import MainContainerGame from "../../../../../../common-components/main-container-game/MainContainerGame";
import { useQuizGameAdminContext } from "../../../../../../quiz-game-context/QuizGameAdminContext";
import PlayerItem from "./components/PlayerItem";

export default function PlayersList() {
  const { players } = useQuizGameAdminContext();

  return (
    <MainContainerGame title="Список игроков">
      <div>
        {players?.map((el) => (
          <PlayerItem player={el} />
        ))}
      </div>
    </MainContainerGame>
  );
}
