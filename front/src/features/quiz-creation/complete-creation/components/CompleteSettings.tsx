import type { QuizDTO } from "../../../../core/hooks/quiz-creation-microservice/useQuizApi";
import styles from "./CompleteSettings.module.css";
import useQuiz from "../hooks/useQuiz";

interface Props {
  quiz: QuizDTO | undefined;
}

export default function CompleteSettings({ quiz }: Props) {
  const { newQuizSession } = useQuiz();

  const startQuizSessionHandler = async () => {
    await newQuizSession();
  };

  return (
    <div className={styles.main}>
      <div className={styles.nav}>hz zachem</div>
      <div className={styles.content}>
        {quiz === undefined ? (
          <span>loading...</span>
        ) : (
          <div>
            <div>Название: {quiz.title}</div>
            <div>Описание: {quiz.description}</div>
            <div>Тема: </div>
            <div>Количество вопросв: </div>
            {/* <div>Время на выполнение: {quiz.time}</div> */}
          </div>
        )}
        <div className={styles.buttons}>
          <button>Сохранить</button>
          <button onClick={startQuizSessionHandler}>Запустить</button>
        </div>
      </div>
    </div>
  );
}
