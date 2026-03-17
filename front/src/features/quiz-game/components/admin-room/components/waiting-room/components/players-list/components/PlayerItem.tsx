import { useState, useRef, useEffect } from "react";
import type { Player } from "../../../../../../../../../core/hooks/quiz-game-microservice/usePlayer";
import styles from "./PlayerItem.module.css";

interface Props {
  player: Player;
}

export default function PlayerItem({ player }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={styles.main} ref={ref}>
      <div className={styles.player}>
        <label>{player.nickname}</label>
      </div>

      <button className={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)}>
        ⋮
      </button>

      {menuOpen && (
        <div className={styles.contextMenu}>
          <div className={styles.menuItem}>while empty</div>
          <div className={styles.menuItem}>while empty</div>
        </div>
      )}
    </div>
  );
}
