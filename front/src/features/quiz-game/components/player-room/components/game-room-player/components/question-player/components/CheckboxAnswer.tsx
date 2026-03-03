import type { AnswerDTO } from "../../../../../../../../../core/hooks/quiz-creation-microservice/useAnswer";
import styles from "./CheckboxAnswer.module.css";

interface Props {
  answers: AnswerDTO[];
}

export default function CheckboxAnswer({ answers }: Props) {
  return (
    <div>
      Ответы:
      <div className={styles.answers}>
        {answers.map((el) => (
          <input key={el.id} type="checkbox" value={el.text}></input>
        ))}
      </div>
    </div>
  );
}
