import { useNavigate } from "react-router-dom";
import NavigationPanel from "../../../../shared/components/navigation-panel/NavigationPanel";
import "./styles/base.css";
import "./styles/responsive.css";
import Footer from "../../../../shared/components/footer/Footer";
import { useState } from "react";
import useQuiz from "../../../../core/hooks/useQuiz";

export default function AddInfo() {
  const [inputTitleQuiz, setInputTitleQuiz] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputTime, setInputTime] = useState("15:00");
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const navigate = useNavigate();
  const { addQuiz } = useQuiz();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!inputTitleQuiz.trim()) {
      newErrors.title = "Название квиза обязательно";
    } else if (inputTitleQuiz.trim().length < 3) {
      newErrors.title = "Название должно содержать минимум 3 символа";
    }
    
    if (!inputDescription.trim()) {
      newErrors.description = "Описание квиза обязательно";
    } else if (inputDescription.trim().length < 10) {
      newErrors.description = "Описание должно содержать минимум 10 символов";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClickContinue = () => {
    if (validateForm()) {
      const [min, sec] = inputTime.split(":").map(Number);
      const secs = min * 60 + sec;

      addQuiz({
        title: inputTitleQuiz.trim(),
        description: inputDescription.trim(),
        time: secs.toString(),
      });

      navigate("/quiz/create/manual/add");
    }
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  return (
    <div className="starting-create__main-container">
      <NavigationPanel className="create-page">
        <div className="nav-placeholder">Создание квиза</div>
      </NavigationPanel>
      
      <div className="starting-create__content">
        <div className="form-header">
          <div className="form-icon">📝</div>
          <h1>Создание нового квиза</h1>
          <p>Заполните основную информацию о вашем квизе</p>
        </div>
        
        <form className="quiz-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="quiz-title">Название квиза</label>
            <input
              id="quiz-title"
              type="text"
              placeholder="Введите название"
              className={`form-input ${errors.title ? "error" : ""}`}
              onChange={(e) => {
                setInputTitleQuiz(e.target.value);
                clearError("title");
              }}
              value={inputTitleQuiz}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="quiz-description">Описание квиза</label>
            <textarea
              id="quiz-description"
              placeholder="Введите описание для квиза"
              className={`form-textarea ${errors.description ? "error" : ""}`}
              value={inputDescription}
              onChange={(e) => {
                setInputDescription(e.target.value);
                clearError("description");
              }}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="quiz-time">Время на прохождение квиза</label>
            <input
              type="time"
              step="60"
              className="form-input time-input"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
            />
            <small className="time-hint">Выберите время в формате ЧЧ:ММ</small>
          </div>
          
          <button
            type="button"
            className="continue-btn"
            onClick={handleClickContinue}
          >
            <span className="btn-icon">🚀</span>
            Продолжить
          </button>
        </form>
      </div>
      
      <Footer />
    </div>
  );
}
