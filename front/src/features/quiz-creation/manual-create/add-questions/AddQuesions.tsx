//Components
import NavigationPanel from "../../../../shared/components/navigation-panel/NavigationPanel";
import QuestionBlock from "./components/QuestionBlock";
//Styles
import "./styles/base.css";
import "./styles/responsive.css";
//Hooks
import useQuestoins from "../../../../core/hooks/useQuestoins";
import Footer from "../../../../shared/components/footer/Footer";
import { useNavigate } from "react-router-dom";

export default function AddQuesions() {
  const navigate = useNavigate();

  const storedId = sessionStorage.getItem("lastCreatedQuizId");

  const quizId = Number(storedId);

  if (!quizId) {
    console.error("Нет ID квиза — вернись на страницу создания");
  }

  const {
    addQuestion,
    deleteQuestion,
    questions,
    editQuestion,
    completeAddingQuestions,
  } = useQuestoins([{ tmpid: 1, numQ: 1, value: "", quizId: quizId }]);

  const handleCompliteAddingQuestions = () => {
    completeAddingQuestions();
    navigate("quiz/create/manual/complete");
  };

  return (
    <div>
      <NavigationPanel className="create-page">
        <div>123123</div>
      </NavigationPanel>
      <div className="create-quiz-page__main-container">
        <div className="create-quiz-page__content-container">
          <div className="container-with-questions">
            {questions.map((el) => (
              <QuestionBlock
                key={el.tmpid}
                questionId={el.tmpid}
                numberQuestion={el.numQ}
                onDelete={deleteQuestion}
                onEdit={editQuestion}
                quizId={quizId}
              />
            ))}
          </div>

          <button
            className="btn__add-question h-10 bg-blue-500 rounded text-white w-full"
            onClick={() => addQuestion(quizId)}
          >
            Add questions
          </button>

          <button
            className="btn__save-quiz"
            onClick={handleCompliteAddingQuestions}
          >
            Завершить
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
