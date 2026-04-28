import type { Answer } from "../../../../../../../manual-create/create-context/reducer";
import styles from "./AnswerBlock.module.css";

interface Props {
  answer: Answer;
}

export default function AnswerBlock({ answer }: Props) {
  return (
    <div className={styles.main}>
      <label>
        {answer.index}. {answer.text}
      </label>
      {answer.isCorrect && <label>✓</label>}
    </div>
  );
}
