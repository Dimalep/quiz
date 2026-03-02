import type { AnswerDTO } from "../../../../../../../../../core/hooks/quiz-creation-microservice/useAnswer";
import { useQuizGamePlayerContext } from "../../../../../../../quiz-game-context/QuizGamePlayerContext";
import styles from "./ButtonsAnswer.module.css";

interface Props {
  answers: AnswerDTO[];
}

export default function ButtonsAnswer({ answers }: Props) {
  const { giveAnswer } = useQuizGamePlayerContext();

  return (
    <div className={styles.main}>
      <span>Ответы:</span>
      {answers.map((el) => (
        <button key={el.id} onClick={() => giveAnswer(el)}>
          {el.text}
        </button>
      ))}
    </div>
  );
}
