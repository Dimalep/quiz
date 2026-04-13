import type { Quiz } from "../../manual-create/create-context/reducer";
import styles from "./CompleteSettings.module.css";

interface Props {
  quiz: Quiz | undefined;
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
