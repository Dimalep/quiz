import { useEffect, useState } from "react";
import type { AnswerResult } from "../../../../../../../../../core/hooks/quiz-game-microservice/useProgress";
import type { Answer } from "../../../../../../../../quiz-creation/manual-create/create-context/reducer";
import { useQuizGamePlayerContext } from "../../../../../../../quiz-game-context/QuizGamePlayerContext";
import styles from "./ButtonsAnswer.module.css";

interface Props {
  answers: Answer[];
}

export default function ButtonsAnswer({ answers }: Props) {
  const { giveAnswer, actualProgress, currentQuestion } =
    useQuizGamePlayerContext();

  const actual = actualProgress.questions.find(
    (el) => el.id === currentQuestion?.id,
  );

  const [selectedAnswer, setSelectedAnswer] = useState<Answer | undefined>();

  useEffect(() => {
    if (!currentQuestion) {
      console.log("Current questions is undefined");
      return;
    }

    setSelectedAnswer(
      currentQuestion?.answers.find((q) => q.id === actual?.answers[0].id),
    );
  }, [currentQuestion]);

  const toAnswerHandler = () => {
    if (!selectedAnswer) {
      return;
    }

    const answerResult: AnswerResult = {
      id: selectedAnswer.id,
      answerIndex: selectedAnswer.index,
      answerText: selectedAnswer.text,
      isCorrect: selectedAnswer.isCorrect,
    };

    giveAnswer([answerResult]);
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
