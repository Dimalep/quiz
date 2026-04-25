import { useEffect, useState } from "react";
import type { Answer } from "../../../../../../../../quiz-creation/manual-create/create-context/reducer";
import { useQuizGamePlayerContext } from "../../../../../../../quiz-game-context/QuizGamePlayerContext";
import styles from "./CheckboxAnswer.module.css";
import type { AnswerResult } from "../../../../../../../../../core/api/quiz-game-service/useProgress";

interface Props {
  answers: Answer[];
}

export default function CheckboxAnswer({ answers }: Props) {
  const { toAnswer, answerHistory, curQuestion } = useQuizGamePlayerContext();

  const [inputAnswers, setInputAnswers] = useState<AnswerResult[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const colors = ["#00C9A7", "#00B8D9", "#4D96FF", "#845EC2", "#2C73D2"];

  useEffect(() => {
    if (!curQuestion) return;

    const currentAnswerHistory =
      answerHistory.find((ah) => ah.questionId === curQuestion.id)?.answerId ??
      [];

    const mapped = answers
      .filter((a) => currentAnswerHistory.includes(a.id))
      .map((a) => ({
        id: a.id,
        answerIndex: a.index,
        answerText: a.text,
        isCorrect: a.isCorrect,
      }));

    setInputAnswers(mapped);
  }, [curQuestion, answerHistory, answers]);

  const isSelected = (id: string) => inputAnswers.some((el) => el.id === id);

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
          {answers.map((el, index) => {
            const selected = isSelected(el.id);

            return (
              <label
                key={el.index}
                className={`${styles.answerLabel} ${
                  selected ? styles.selected : ""
                }`}
                style={{ background: colors[index] }}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleAnswer(el)}
                />
                {el.text}
              </label>
            );
          })}
        </div>
      </div>
      <button className={styles.give_answer_btn} onClick={handleSubmit}>
        Дать ответ
      </button>
    </>
  );
}
