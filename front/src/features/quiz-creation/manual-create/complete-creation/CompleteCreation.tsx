import { useNavigate } from "react-router-dom";
import Footer from "../../../../shared/components/footer/Footer";
import NavigationPanel from "../../../../shared/components/navigation-panel/NavigationPanel";

import "./styles/base.css";
import "./styles/responsive.css";

export default function CompleteCreation() {
  const navigate = useNavigate();
  const lastCreatedQuizId = sessionStorage.getItem("lastCreatedQuizId");

  return (
    <div className="complete-creation-container">
      <NavigationPanel className="create-page">
        <div className="nav-placeholder">Завершение создания</div>
      </NavigationPanel>
      
      <div className="complete-creation-content">
        <div className="content-header">
          <h1>Квиз успешно создан! 🎉</h1>
          <p>Ваш квиз готов к использованию</p>
        </div>
        
        <div className="quiz-summary">
          <h2>Информация о квизе</h2>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="label">Название квиза</span>
              <span className="value">Мой первый квиз</span>
            </div>
            <div className="summary-item">
              <span className="label">Время на прохождение</span>
              <span className="value">15 минут</span>
            </div>
            <div className="summary-item">
              <span className="label">Описание</span>
              <span className="value">Увлекательный тест для проверки знаний</span>
            </div>
            <div className="summary-item">
              <span className="label">Количество вопросов</span>
              <span className="value">5 вопросов</span>
            </div>
          </div>
        </div>
        
        <div className="action-buttons">
          <button
            className="btn-launch"
            onClick={() => navigate(`/quiz/play/room/${lastCreatedQuizId}`)}
          >
            <span className="btn-icon">🚀</span>
            Запустить квиз
          </button>
          <button className="btn-save">
            <span className="btn-icon">💾</span>
            Сохранить квиз
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
