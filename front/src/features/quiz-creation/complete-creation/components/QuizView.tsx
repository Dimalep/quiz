import type { Quiz } from "../../manual-create/create-context/reducer";
import styles from "./QuizView.module.css";

interface Props {
  quiz: Quiz | undefined;
}

export default function QuizView({ quiz }: Props) {
  return (
    <div className={styles.main}>
      <h2>Просмотр вопросов</h2>

      <div className={styles.questions_container}>
        {quiz?.questions.map((question) => (
          <div className={styles.question_card} key={question.id}>
            <h3>Вопрос: {question.text}</h3>

            <div className={styles.answer_list}>
              <h4>Ответы:</h4>
              {question.answers.map((answer) => (
                <div
                  key={answer.index}
                  className={`${styles.answer_item} ${answer.isCorrect ? styles.correct : ""}`}
                >
                  <span>{answer.index}.</span>
                  <span>{answer.text || "<Пустой ответ>"}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
