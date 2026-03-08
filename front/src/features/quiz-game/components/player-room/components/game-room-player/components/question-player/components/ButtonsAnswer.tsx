import type { AnswerResult } from "../../../../../../../../../core/hooks/quiz-game-microservice/useProgress";
import type { Answer } from "../../../../../../../../quiz-creation/manual-create/create-context/reducer";
import { useQuizGamePlayerContext } from "../../../../../../../quiz-game-context/QuizGamePlayerContext";
import styles from "./ButtonsAnswer.module.css";

interface Props {
  answers: Answer[];
}

export default function ButtonsAnswer({ answers }: Props) {
  const { giveAnswer } = useQuizGamePlayerContext();

  const clickHandler = (answer: Answer) => {
    const answerResult: AnswerResult = {
      answerIndex: answer.index,
      answerText: answer.text,
      isCorrect: answer.isCorrect,
    };

    giveAnswer([answerResult]);
  };

  return (
    <div className={styles.main}>
      <span>Ответы:</span>
      {answers.map((el) => (
        <button key={el.index} onClick={() => clickHandler(el)}>
          {el.text}
        </button>
      ))}
    </div>
  );
}
