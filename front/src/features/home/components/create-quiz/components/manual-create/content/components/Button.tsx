import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import useQuizCreationService from "../../../../../../../../core/hooks/quiz-creation-microservice/useQuizService";

export default function Button() {
  const navigate = useNavigate();
  const { createNewQuiz } = useQuizCreationService();

  const handleClick = async () => {
    //request to backend for creation new quiz and return quiz id
    // const fakeQuizId = crypto.randomUUID();
    //
    const quizId = await createNewQuiz();

    if (localStorage.getItem("quizDraft") !== null) {
      const result = window.confirm(
        "У вас есть недоделанный тест, хотите ли удалить его?",
      );

      if (result) {
        localStorage.removeItem("quizDraft");
      } else {
        console.log("Пользователь отменил удаление");
      }
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
