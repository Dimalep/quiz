import styles from "./AnswerButtons.module.css";
import type { Answer } from "../../../../../../../create-context/reducer";
import AnswerButton from "./components/AnswerButton";

interface Props {
  answers: Answer[];
}

export default function AnswerBlock({ answers }: Props) {
  const correctAnswers = answers.filter((a) => a.isCorrect);
  const incorrectAnswers = answers.filter((a) => !a.isCorrect);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        {correctAnswers.length > 0 && (
          <>
            <span>Правильный ответ</span>
            <div className={styles.correct_block}>
              {correctAnswers.map((el) => (
                <AnswerButton key={el.index} answer={el} isCorrect={true} />
              ))}
            </div>
          </>
        )}
        <span>Неправильные ответы</span>
        <div className={styles.incorrect_block}>
          {incorrectAnswers.map((el) => (
            <AnswerButton key={el.index} answer={el} isCorrect={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
