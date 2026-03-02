import type { QuestionWithAnswers } from "../../../../../../../../core/hooks/quiz-creation-microservice/useQuestion";
import styles from "./QuestionPlayer.module.css";

interface Props {
  question: QuestionWithAnswers | undefined;
}

export default function QuestionPlayer({ question }: Props) {
  if (!question) return;

  return (
    <div>
      <h3>{question?.title}</h3>
      <div className={styles.answers}>
        {question.answers.map((el) => (
          <button key={el.id}>{el.text}</button>
        ))}
      </div>
    </div>
  );
}
