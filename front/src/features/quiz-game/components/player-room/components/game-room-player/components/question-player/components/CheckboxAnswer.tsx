import { useEffect, useState } from "react";
import type { Answer } from "../../../../../../../../quiz-creation/manual-create/create-context/reducer";
import { useQuizGamePlayerContext } from "../../../../../../../quiz-game-context/QuizGamePlayerContext";
import styles from "./CheckboxAnswer.module.css";
import type { AnswerResult } from "../../../../../../../../../core/hooks/quiz-game-microservice/useProgress";

interface Props {
  answers: Answer[];
}

export default function CheckboxAnswer({ answers }: Props) {
  const { toAnswer, actualProgress, curQuestion } = useQuizGamePlayerContext();

  const [inputAnswers, setInputAnswers] = useState<AnswerResult[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const actual = actualProgress.questions.find(
    (el) => el.id === curQuestion?.id,
  );

  useEffect(() => {
    if (actual) {
      setInputAnswers(actual.answers);
    } else {
      setInputAnswers([]);
    }
  }, [curQuestion, actual]);

  const toggleAnswer = (answer: Answer) => {
    setInputAnswers((prev) => {
      if (prev.some((a) => a.answerIndex === answer.index)) {
        return prev.filter((a) => a.answerIndex !== answer.index);
      }
      return [
        ...prev,
        {
          id: answer.id,
          answerIndex: answer.index,
          answerText: answer.text,
          isCorrect: answer.isCorrect,
        },
      ];
    });
  };

  const handleSubmit = () => {
    if (inputAnswers.length === 0) {
      setIsEmpty(true);
      return;
    }

    const answerIds = inputAnswers.map((ia) => ia.id);
    toAnswer(answerIds);
    // giveAnswer(inputAnswers);
  };

  if (!answers) {
    console.log("answers is null: ", answers);
    return;
  }

  return (
    <>
      {isEmpty && <label>Выбирите ответ</label>}
      <div className={styles.main}>
        <div className={styles.title}>Ответы:</div>

        <div className={styles.answers}>
          {answers.map((el) => (
            <label key={el.index} className={styles.answerLabel}>
              <input
                type="checkbox"
                value={el.text}
                checked={inputAnswers.some((a) => a.answerIndex === el.index)}
                onChange={() => toggleAnswer(el)}
              />
              {el.text}
            </label>
          ))}
        </div>
      </div>
      <button className={styles.give_answer_btn} onClick={handleSubmit}>
        Дать ответ
      </button>
    </>
  );
}
