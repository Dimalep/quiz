import type { Quiz } from "../../../../core/hooks/quiz-creation-microservice/useQuizService";
import styles from "./CompleteSettings.module.css";

interface Props {
  quiz: Quiz | undefined;
}

export default function CompleteSettings({ quiz }: Props) {
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
            <div>Время на выполнение: {quiz.time}</div>
          </div>
        )}
        <div className={styles.buttons}>
          <button>Сохранить</button>
          <button>Запустить</button>
        </div>
      </div>
    </div>
  );
}
