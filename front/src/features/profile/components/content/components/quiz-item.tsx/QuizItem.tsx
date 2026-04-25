import { useNavigate } from "react-router-dom";
import type { Quiz } from "../../../../../quiz-creation/manual-create/create-context/reducer";
import { useProfileContext } from "../../../../ProfileProvider";
import styles from "./QuizItem.module.css";
import QuizIco from "../../../../../../shared/icons/Quiz";
import { useState } from "react";

interface Props {
  quiz: Quiz;
}

export default function QuizItem({ quiz }: Props) {
  const { deleteQuiz, initialGame, editQuiz } = useProfileContext();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const deleteHander = async () => {
    const res = confirm("Удалить квиз?");

    if (res) await deleteQuiz(quiz.id);
  };

  const launchHandler = async () => {
    if (!quiz) return;
    const res = confirm(`Запустить квиз ${quiz.title}?`);

    console.log(`ID quiz - ${quiz.id}`);

    if (res) {
      const game = await initialGame(quiz.id);
      if (!game) return;

      console.log("Game status: ", game.key);

      localStorage.setItem("quizSession", JSON.stringify(game));
      navigate(`/quiz/game/admin/${game.key}`);
    }
  };

  const editClickHandler = () => {
    editQuiz(quiz.id);
  };

  return (
    <div className={styles.main}>
      <div className={styles.ico}>
        <QuizIco />
      </div>

      <div className={styles.info}>
        <label className={styles.title}>{quiz.title}</label>
        <label className={styles.create_at}>create at</label>

        <div className={styles.quantity_question}>
          вопросов: {quiz.quantityQuestions}
        </div>
      </div>

      <label
        className={styles.dropdown_btn}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        ⋮
      </label>

      {isOpen && (
        <div
          className={styles.dropdown}
          onClick={() => setIsOpen((prev) => !prev)}
        >
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
      )}
    </div>
  );
}
