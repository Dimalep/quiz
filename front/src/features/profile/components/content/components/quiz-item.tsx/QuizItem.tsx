import { useNavigate } from "react-router-dom";
import type { Quiz } from "../../../../../quiz-creation/manual-create/create-context/reducer";
import { useProfileContext } from "../../../../ProfileProvider";
import styles from "./QuizItem.module.css";

interface Props {
  quiz: Quiz;
}

export default function QuizItem({ quiz }: Props) {
  const { deleteQuiz, addGame, editQuiz } = useProfileContext();
  const navigate = useNavigate();

  const deleteHander = async () => {
    const res = confirm("Удалить квиз?");

    if (res) await deleteQuiz(quiz.id);
  };

  const launchHandler = async () => {
    if (!quiz) return;
    const res = confirm(`Запустить квиз ${quiz.title}?`);
    if (res) {
      const game = await addGame(quiz.id);
      if (!game) return;
      localStorage.setItem("quizSession", JSON.stringify(game));
      navigate(`/quiz/game/admin/${game.sessionKey}`);
    }
  };

  const editClickHandler = () => {
    editQuiz(quiz.id);
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <span>Название</span>
        <h3>{quiz.title}</h3>
      </div>
      <div className={styles.buttons}>
        <button className={styles.launch} onClick={launchHandler}>
          Запустить
        </button>
        <button className={styles.edit} onClick={editClickHandler}>
          Изменить
        </button>
        <button className={styles.delete} onClick={deleteHander}>
          Удалить
        </button>
      </div>
    </div>
  );
}
