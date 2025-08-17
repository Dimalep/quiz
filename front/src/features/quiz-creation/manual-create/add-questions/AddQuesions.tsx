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
import { useState, useEffect } from "react";

export default function AddQuesions() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [canComplete, setCanComplete] = useState(false);

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

  // Calculate progress and check if quiz can be completed
  useEffect(() => {
    const validQuestions = questions.filter((q) => q.value.trim() !== "");
    const totalProgress = validQuestions.length;
    const progressPercentage =
      questions.length > 0 ? (totalProgress / questions.length) * 100 : 0;

    setProgress(progressPercentage);
    setCanComplete(totalProgress >= 1 && questions.length >= 1);
  }, [questions]);

  const handleAddQuestion = () => {
    addQuestion(quizId);
  };

  const handleCompleteAddingQuestions = () => {
    if (canComplete) {
      completeAddingQuestions();
      navigate("/quiz/create/manual/complete");
    }
  };

  const handleDeleteQuestion = (id: number) => {
    if (questions.length > 1) {
      deleteQuestion(id);
    }
  };

  return (
    <div className="add-questions-container">
      <NavigationPanel className="create-page">
        <div className="nav-placeholder">
          Добавление вопросов {questions.length > 0 && `(${questions.length})`}
        </div>
      </NavigationPanel>

      <div className="add-questions-content">
        <div className="content-header">
          <h1>Добавление вопросов к квизу</h1>
          <p>Создайте интересные вопросы для вашего квиза</p>

          {/* Progress Section */}
          <div className="progress-section">
            <div className="progress-info">
              <span className="progress-text">
                Вопросов создано: {questions.length}
              </span>
              <span className="progress-percentage">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="progress-hint">
              {questions.length === 0
                ? "Добавьте первый вопрос для начала"
                : questions.length === 1
                ? "Добавьте еще вопросы или завершите создание"
                : "Продолжайте добавлять вопросы или завершите создание"}
            </div>
          </div>
        </div>

        <div className="questions-section">
          {questions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">❓</div>
              <h3>Нет вопросов</h3>
              <p>Начните с добавления первого вопроса для вашего квиза</p>
            </div>
          ) : (
            <div className="container-with-questions">
              {questions.map((el, index) => (
                <QuestionBlock
                  key={el.tmpid}
                  questionId={el.tmpid}
                  numberQuestion={index + 1}
                  onDelete={handleDeleteQuestion}
                  onEdit={editQuestion}
                  quizId={quizId}
                  isLast={index === questions.length - 1}
                />
              ))}
            </div>
          )}

          <div className="action-buttons">
            <button className="btn__add-question" onClick={handleAddQuestion}>
              <span className="btn-icon">➕</span>
              Добавить вопрос
            </button>

            <button
              className={`btn__save-quiz ${!canComplete ? "disabled" : ""}`}
              onClick={handleCompleteAddingQuestions}
              disabled={!canComplete}
            >
              <span className="btn-icon">✅</span>
              Завершить создание
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
