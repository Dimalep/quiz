import type { QuizDTO } from "../../../../core/hooks/quiz-creation-microservice/useQuizApi";
import styles from "./CompleteSettings.module.css";

interface Props {
  quiz: QuizDTO | undefined;
}

export default function CompleteSettings({ quiz }: Props) {
  return (
    <div className={styles.main}>
      <h2>Информация о квизе</h2>
      <div className={styles.content}>
        {quiz === undefined ? (
          <span>loading...</span>
        ) : (
          <div>
            <div>Название: {quiz.title}</div>
            <div>Описание: {quiz.description}</div>
            <div>Тема: </div>
            <div>Количество вопросв: {quiz.quantityQuestions}</div>
          </div>
        )}
      </div>
    </div>
  );
}
