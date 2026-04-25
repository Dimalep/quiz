import { useEffect, useState } from "react";
import type { Answer } from "../../../../../../../../quiz-creation/manual-create/create-context/reducer";
import { useQuizGamePlayerContext } from "../../../../../../../quiz-game-context/QuizGamePlayerContext";
import styles from "./ButtonsAnswer.module.css";

interface Props {
  answers: Answer[];
}

export default function ButtonsAnswer({ answers }: Props) {
  const { toAnswer, answerHistory, curQuestion } = useQuizGamePlayerContext();

  const colors = ["#00C9A7", "#00B8D9", "#4D96FF", "#845EC2", "#2C73D2"];

  const [selectedAnswer, setSelectedAnswer] = useState<Answer | undefined>();

  useEffect(() => {
    const id = answerHistory.find(
      (ah) => ah.questionId === curQuestion?.id,
    )?.answerId;

    if (id) setSelectedAnswer(answers.find((a) => a.id === id[0]));
  }, []);

  const toAnswerHandler = () => {
    if (!selectedAnswer) return;
    toAnswer([selectedAnswer.id]);
  };

  return (
    <>
      <div className={styles.main}>
        <span>Варианты ответов:</span>

        <div className={styles.answers}>
          {answers.map((el, index) => (
            <button
              key={el.index}
              onClick={() => {
                setSelectedAnswer(el);
              }}
              className={selectedAnswer?.id === el.id ? styles.select : ""}
              style={{ background: colors[index] }}
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
