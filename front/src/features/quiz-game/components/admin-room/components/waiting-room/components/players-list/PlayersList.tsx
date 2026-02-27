import { useState } from "react";
import { useQuizGameAdminContext } from "../../../../../../quiz-game-context/QuizGameAdminContext";
import PlayerItem from "./components/PlayerItem";
import styles from "./PlayersList.module.css";

export default function PlayersList() {
  const { players } = useQuizGameAdminContext();
  const [isOpenContextMenu, setIsOpenContextMenu] = useState(false);

  return (
    <div className={styles.main}>
      {/* <PlayerItem
        player={{ id: 1, nickname: "admin", role: "admin" }}
        isOpenContextMenu={isOpenContextMenu}
        setIsOpenContextMenu={setIsOpenContextMenu}
      />
      <PlayerItem
        player={{ id: 2, nickname: "palyer", role: "admin" }}
        isOpenContextMenu={isOpenContextMenu}
        setIsOpenContextMenu={setIsOpenContextMenu}
      /> */}
      {players?.map((p) => (
        <PlayerItem key={p.id} player={p} />
      ))}
    </div>
  );
}
