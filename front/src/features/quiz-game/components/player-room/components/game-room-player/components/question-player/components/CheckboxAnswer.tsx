import { useState } from "react";
import type { Answer } from "../../../../../../../../quiz-creation/manual-create/create-context/reducer";
import { useQuizGamePlayerContext } from "../../../../../../../quiz-game-context/QuizGamePlayerContext";
import styles from "./CheckboxAnswer.module.css";
import type { AnswerResult } from "../../../../../../../../../core/hooks/quiz-game-microservice/useProgress";

interface Props {
  answers: Answer[];
}

export default function CheckboxAnswer({ answers }: Props) {
  const { giveAnswer } = useQuizGamePlayerContext();

  const [inputAnswers, setInputAnswers] = useState<AnswerResult[]>([]);

  const toggleAnswer = (answer: Answer) => {
    setInputAnswers((prev) => {
      if (prev.some((a) => a.answerIndex === answer.index)) {
        return prev.filter((a) => a.answerIndex !== answer.index);
      }
      return [
        ...prev,
        {
          answerIndex: answer.index,
          answerText: answer.text,
          isCorrect: answer.isCorrect,
        },
      ];
    });
  };

  const handleSubmit = () => {
    if (inputAnswers.length === 0) return;
    giveAnswer(inputAnswers);
    setInputAnswers([]);
  };

  return (
    <div>
      Ответы:
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
      <button onClick={handleSubmit}>Дать ответ</button>
    </div>
  );
}
