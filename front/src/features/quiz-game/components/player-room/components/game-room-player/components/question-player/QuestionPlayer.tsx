import { useQuizGamePlayerContext } from "../../../../../../quiz-game-context/QuizGamePlayerContext";
import ButtonsAnswer from "./components/ButtonsAnswer";
import CheckboxAnswer from "./components/CheckboxAnswer";
import Media from "./components/media/Media";
import styles from "./QuestionPlayer.module.css";

// if current question is null that quiz is over
export default function QuestionPlayer() {
  const { curQuestion, toAnsweredLoading } = useQuizGamePlayerContext();

  if (toAnsweredLoading)
    return (
      <div className={styles.main}>
        <h3>Загрузка следующего вопроса...</h3>
      </div>
    );

  if (curQuestion)
    return (
      <div className={styles.main}>
        <div className={styles.question}>
          <span>Вопрос:</span>
          <h2>{curQuestion.text}</h2>
        </div>

        {curQuestion.imageUrl !== "" && (
          <Media imageUrl={curQuestion.imageUrl} />
        )}

        {curQuestion.type === "buttons" ? (
          <ButtonsAnswer answers={curQuestion.answers} />
        ) : (
          <CheckboxAnswer answers={curQuestion.answers} />
        )}
      </div>
    );
  else
    return (
      <div className={styles.main}>
        <div className={styles.end}>
          <h3>Конец</h3>
          <h4>Нажмите заврешить, чтобы посмотреть результаты</h4>
        </div>
      </div>
    );
}
