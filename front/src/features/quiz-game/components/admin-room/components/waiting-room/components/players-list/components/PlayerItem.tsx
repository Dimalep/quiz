import type { Dispatch, SetStateAction } from "react";
import type { Player } from "../../../../../../../../../core/hooks/quiz-game-microservice/usePlayer";
import styles from "./PlayerItem.module.css";

interface Props {
  player: Player;
  // isOpenContextMenu: boolean;
  // setIsOpenContextMenu: Dispatch<SetStateAction<boolean>>;
}

export default function PlayerItem({
  player,
  // isOpenContextMenu,
  // setIsOpenContextMenu,
}: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.player}>
        <div>1</div>
        <span>{player.nickname}</span>
      </div>
      <label>=</label>
      {/* <label onClick={() => setIsOpenContextMenu((prev) => !prev)}>=</label>
      {isOpenContextMenu && (
        <div className={styles.context_menu}>123123123</div>
      )} */}
    </div>
  );
}
