//Styles
import { useNavigate } from "react-router-dom";
import "../styles/creating_styles.css";
import "../../../shared/styles/buttons_styles.css";

export default function Creating() {
  const navigate = useNavigate();

  return (
    <div className="home__content__creating">
      <div className="home__content__creating__text">
        <div className="creating-icon">✨</div>
        <h1>
          <b>Создание нового квиза</b>
        </h1>
        <p className="creating-description">
          Создайте увлекательный квиз для вашей аудитории! 
          Простой и интуитивный интерфейс поможет вам быстро 
          создать качественный тест без регистрации.
        </p>
        <button
          className="btn creating-btn"
          onClick={() => {
            navigate("/quiz/create");
          }}
        >
          <span className="btn-icon">🚀</span>
          Создать квиз
        </button>
      </div>
      <div className="home__content__creating__animation">
        <div className="floating-elements">
          <div className="floating-element">🎯</div>
          <div className="floating-element">🧠</div>
          <div className="floating-element">⭐</div>
          <div className="floating-element">🎉</div>
        </div>
      </div>
    </div>
  );
}
