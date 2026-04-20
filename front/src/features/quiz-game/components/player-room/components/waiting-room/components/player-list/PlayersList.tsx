import MainContainerGame from "../../../../../../common-components/main-container-game/MainContainerGame";
import { useQuizGamePlayerContext } from "../../../../../../quiz-game-context/QuizGamePlayerContext";
import PlayerItem from "./player-item/PlayerItem";

export default function PlayersList() {
  const { players } = useQuizGamePlayerContext();

  return (
    <MainContainerGame title="Список игроков">
      {players?.map((e, index) => (
        <PlayerItem key={index} player={e} />
      ))}
    </MainContainerGame>
    // <div className={styles.main}>
    //   <div className={styles.head}>
    //     <span>Список игроков</span>
    //     <span>{players?.length}</span>
    //   </div>
    //   {players?.map((e, index) => (
    //     <PlayerItem key={index} player={e} />
    //   ))}
    // </div>
  );
}
