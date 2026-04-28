import type { Question } from "../../../../../manual-create/create-context/reducer";
import { useGeneratorContext } from "../../../../AiGenerateContext";
import AnswerBlock from "./components/answer/AnswerBlock";
import styles from "./QuestionBlock.module.css";

interface Props {
  question: Question;
}

export default function QuestionBlock({ question }: Props) {
  const { dispatch, state } = useGeneratorContext();

  const isSelect = state.currentQuestion?.id === question.id;

  const complexity =
    question.complexity === 1 ? (
      <div className={styles.easy}>Легкая</div>
    ) : question.complexity === 2 ? (
      <div className={styles.middle}>Средная</div>
    ) : (
      <div className={styles.hard}>Сложная</div>
    );

  return (
    <div
      className={`${styles.main} ${isSelect ? styles.select : ""}`}
      onClick={() => {
        dispatch({ type: "SET_CURRENT_QUESTION", payload: question });
      }}
    >
      <label className={styles.question_text}>{question.text}</label>

      <div className={styles.complexity}>
        <label>Сложность:</label>
        {complexity}
      </div>

      <div>
        {question.answers?.map((el) => (
          <AnswerBlock key={el.id} answer={el} />
        ))}
      </div>
    </div>
  );
}
