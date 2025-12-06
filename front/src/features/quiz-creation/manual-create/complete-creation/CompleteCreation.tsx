import { useNavigate } from "react-router-dom";
import Footer from "../../../../shared/components/footer/Footer";
import NavigationPanel from "../../../../shared/components/navigation-panel/NavigationPanel";

import "./styles/base.css";
import "./styles/responsive.css";
import useSessionStorage from "../../../../core/hooks/useSessionStorage";

export default function CompleteCreation() {
  const { getItemFromSS } = useSessionStorage();
  const navigate = useNavigate();

  const quizId = getItemFromSS("quizId");
  const quizName = getItemFromSS("quizTitle");
  const quizDescription = getItemFromSS("quizDescription");
  const countQuestions = getItemFromSS("countQuestions");

  return (
    <div className="complete__main-container">
      <NavigationPanel>
      </NavigationPanel>
      <div className="complete__content">
        <div className="complete__info-block">
          <div className="complete__info-block__info">
            <label>{quizName}</label>
            <label>Time</label>
            <label>{quizDescription}</label>
            <label>{countQuestions}</label>
          </div>
          <div className="complete__info-block__button">
            <button onClick={() => navigate(`/quiz/play/room/${quizId}/admin`)}>
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
