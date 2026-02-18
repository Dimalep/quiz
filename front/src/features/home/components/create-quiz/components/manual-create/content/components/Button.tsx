import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import useQuizApi from "../../../../../../../../core/hooks/quiz-creation-microservice/useQuizApi";

export default function Button() {
  const navigate = useNavigate();
  const { createNewQuiz } = useQuizApi();

  const handleClick = async () => {
    //request to backend for creation new quiz and return quiz id
    //const fakeQuizId = crypto.randomUUID();
    //
    const saved = localStorage.getItem("quizDraft");

    let quizId: number | undefined;

    if (saved) {
      const result = window.confirm(
        "У вас есть недоделанный тест, хотите ли удалить его?",
      );

      if (result) {
        localStorage.removeItem("quizDraft");
        quizId = await createNewQuiz();
      } else {
        const parsed = JSON.parse(saved);
        quizId = parsed.quiz.id;
      }
    } else {
      quizId = await createNewQuiz();
    }

    navigate(`quiz/${quizId}`);
  };

  return (
    <div>
      <button style={styles.button} onClick={handleClick}>
        перейти к созданию
      </button>
    </div>
  );
}

const styles = {
  button: {
    fontSize: "20px",
    padding: "10px",
  } as CSSProperties,
};
