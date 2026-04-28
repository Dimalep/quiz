import { useNavigate } from "react-router-dom";
import styles from "./CompleteCreation.module.css";
import CompleteSettings from "./components/CompleteSettings";
import QuizView from "./components/QuizView";
import useQuiz from "./hooks/useQuiz";
import { useAuthContext } from "../../../shared/components/AuthProvider";

export default function CompleteCreation() {
  const { quiz, saveAndGoToProfile, newGame } = useQuiz();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();

  const startQuizSessionHandler = async () => {
    await newGame();
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.nav}>
          <label onClick={() => navigate(`/quiz/${quiz?.id}`)}>Вернутся </label>
          <div className={styles.buttons}>
            {isAuthenticated && (
              <button onClick={() => saveAndGoToProfile()}>Сохранить</button>
            )}
            <button onClick={startQuizSessionHandler}>Запустить</button>
          </div>
        </div>
        <CompleteSettings quiz={quiz} />
        <QuizView quiz={quiz} />
      </div>
    </>
  );
}
