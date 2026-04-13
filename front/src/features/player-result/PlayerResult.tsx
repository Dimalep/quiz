import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useProgress, {
  type Progress,
} from "../../core/hooks/quiz-game-microservice/useProgress";
import styles from "./PlayerResult.module.css";

export default function PlayerResult() {
  const navigate = useNavigate();
  const { getProgressById } = useProgress();
  const { progressId } = useParams<{
    progressId: string;
  }>();

  const [progress, setProgress] = useState<Progress>();

  const handler = () => {
    navigate("/");
    localStorage.removeItem("currentGame");
    localStorage.removeItem("currentProgress");
    localStorage.removeItem("currentQuestionId");
  };

  useEffect(() => {
    (async () => {
      const progress = await getProgressById(Number(progressId));

      setProgress(progress);
    })();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>Квиз завершен</h1>

        <div className={styles.stats}>
          <div className={styles.statBox}>
            <div className={styles.statValue}>
              {progress ? progress.quizResult.quantityCorrectAnswers : "-"}
            </div>
            <div className={styles.statLabel}>Правильных</div>
          </div>

          <div className={styles.statBox}>
            <div className={styles.statValue}>
              {progress ? progress.quizResult.questions.length : "-"}
            </div>
            <div className={styles.statLabel}>Всего вопросов</div>
          </div>
        </div>

        <button className={styles.button} onClick={handler}>
          На главную
        </button>
      </div>

      <div className={styles.questionsBlock}>
        {progress?.quizResult.questions.map((question, qIndex) => (
          <div key={qIndex} className={styles.questionCard}>
            <h3 className={styles.questionTitle}>
              {qIndex + 1}. {question.questionText}
            </h3>

            <div className={styles.answersBlock}>
              {question.answers.map((answer, aIndex) => (
                <div
                  key={aIndex}
                  className={`${styles.answerItem} ${
                    answer.isCorrect ? styles.correct : styles.incorrect
                  }`}
                >
                  {answer.answerText}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
