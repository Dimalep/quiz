import { useNavigate } from "react-router-dom";
import useQuizApi from "../../../../../core/api/quiz-creation-service/useQuizApi";
import styles from "./Button.module.css";

export default function Button() {
  const navigate = useNavigate();
  const { createNewQuiz } = useQuizApi();

  const handleClick = async () => {
    const saved = localStorage.getItem("quizDraft");
    const rowUserId = localStorage.getItem("userId");

    if (rowUserId === null) {
      console.log("User id is null");
      return;
    }

    let quizId: number | undefined;

    if (saved) {
      const result = window.confirm(
        "У вас есть недоделанный тест, хотите ли удалить его?",
      );

      if (result) {
        localStorage.removeItem("quizDraft");
        quizId = await createNewQuiz(Number(rowUserId));
      } else {
        const parsed = JSON.parse(saved);
        quizId = parsed.quiz.id;
      }
    } else {
      quizId = await createNewQuiz(Number(rowUserId));
    }

    navigate(`quiz/${quizId}`);
  };

  return (
    <button className={styles.main} onClick={handleClick}>
      перейти к созданию
    </button>
  );
}
