import { useState } from "react";
import type { Answer } from "../../../../../../../../quiz-creation/manual-create/create-context/reducer";
import { useQuizGamePlayerContext } from "../../../../../../../quiz-game-context/QuizGamePlayerContext";
import styles from "./ButtonsAnswer.module.css";

interface Props {
  answers: Answer[];
}

export default function ButtonsAnswer({ answers }: Props) {
  const { toAnswer } = useQuizGamePlayerContext();

  const [selectedAnswer, setSelectedAnswer] = useState<Answer | undefined>();

  const toAnswerHandler = () => {
    if (!selectedAnswer) {
      return;
    }

    toAnswer([selectedAnswer.id]);
  };

  return (
    <>
      <div className={styles.main}>
        <span>Варианты ответов:</span>
        <div className={styles.answers}>
          {answers.map((el) => (
            <button
              className={selectedAnswer?.id === el.id ? styles.select : ""}
              key={el.index}
              onClick={() => setSelectedAnswer(el)}
            >
              {el.text}
            </button>
          ))}
        </div>
      </div>

      <button className={styles.give_answer_btn} onClick={toAnswerHandler}>
        Дать ответ
      </button>
    </>
  );
}
