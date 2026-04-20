import { useState } from "react";
import First from "../../../../../../../../shared/icons/player-icons/First";
import { useQuizGamePlayerContext } from "../../../../../../quiz-game-context/QuizGamePlayerContext";
import styles from "./Settings.module.css";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { currentGame, startGame, currentPlayer, changeName } =
    useQuizGamePlayerContext();

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState(currentPlayer?.nickname || "");

  const startGameHandler = async () => {
    if (currentGame?.status !== "launched") {
      alert("Игра еще не запущена админом");
      return;
    } else startGame();
  };

  const changeNameHanlder = async () => {
    await changeName(nickname);
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.player_short} onClick={() => setIsOpen(true)}>
          <First />
        </div>

        <div className={styles.player}>
          <div className={styles.player_info}>
            <First />
            <label className={styles.nickname}>{nickname}</label>
          </div>

          <button onClick={() => setIsOpen(true)}>🖍️</button>
        </div>

        <div className={styles.btns}>
          <button className={styles.exit} onClick={() => navigate("/")}>
            Выйти
          </button>
          <button className={styles.start} onClick={startGameHandler}>
            Начать
          </button>
        </div>
      </div>

      {isOpen && (
        <div className={styles.edit_window} onClick={() => setIsOpen(false)}>
          <div
            className={styles.edit_content}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.edit_player}>
              <input
                placeholder="Ввдите имя"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div className={styles.edit_btns}>
              <button onClick={() => setIsOpen(false)}>Отменить</button>
              <button onClick={changeNameHanlder}>Применить</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
