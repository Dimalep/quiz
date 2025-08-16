import { useNavigate } from "react-router-dom";
import Footer from "../../../../shared/components/footer/Footer";
import NavigationPanel from "../../../../shared/components/navigation-panel/NavigationPanel";

import "./styles/base.css";
import "./styles/responsive.css";

export default function CompleteCreation() {
  const navigate = useNavigate();
  const lastCreatedQuizId = sessionStorage.getItem("lastCreatedQuizId");

  return (
    <div className="complete__main-container">
      <NavigationPanel className="create-page">
        <div>123</div>
      </NavigationPanel>
      <div className="complete__content">
        <div className="complete__info-block">
          <div className="complete__info-block__info">
            <label>Name quiz</label>
            <label>Time</label>
            <label>Decsription</label>
            <label>Count questions</label>
          </div>
          <div className="complete__info-block__button">
            <button
              onClick={() => navigate(`/quiz/play/room/${lastCreatedQuizId}`)}
            >
              Запустить квиз
            </button>
            <button>Сохранить квиз</button>
          </div>
        </div>
        <div className="complete__quiz-block">123</div>
      </div>
      <Footer />
    </div>
  );
}
