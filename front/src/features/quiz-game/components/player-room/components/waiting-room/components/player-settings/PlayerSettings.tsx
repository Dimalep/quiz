import { useState } from "react";
import { useQuizGamePlayerContext } from "../../../../../../quiz-game-context/QuizGamePlayerContext";
import styles from "./PlayerSettings.module.css";

export default function PlayerSettings() {
  const { currentPlayer, changeName } = useQuizGamePlayerContext();

  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState(currentPlayer?.nickname || "");

  const handleSave = () => {
    changeName(nickname);
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.main}>
        <div>
          <div>{"123"}</div>
          <span>{currentPlayer?.nickname}</span>
        </div>

        <button onClick={() => setIsOpen(true)}>🖍️</button>
      </div>

      {isOpen && (
        <div className={styles.modal_overlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>Edit player</h3>

            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter nickname"
            />

            <div className={styles.buttons}>
              <button onClick={() => setIsOpen(false)}>Отмена</button>
              <button onClick={handleSave}>Сохранить</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
