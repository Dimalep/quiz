import React from "react";
import { useNavigate } from "react-router-dom";

interface QuizCardProps {
  title: string;
  description: string;
  imageUrl: string;
  selectedType: number;
}

const QuizCard: React.FC<QuizCardProps> = ({
  title,
  description,
  imageUrl,
  selectedType,
}) => {
  const navigate = useNavigate();

  const selectTypeHandle = () => {
    switch (selectedType) {
      case 1:
        navigate("/quiz/create/manual/info");
        break;
      case 2:
        navigate("/quiz/create/ai");
        break;
      case 3:
        navigate("/quiz/create/docs");
        break;
    }
  };

  return (
    <div className="quiz-card">
      <div className="quiz-card__content">
        <div className="quiz-card__info">
          <h3 className="quiz-card__title">{title}</h3>
          <p className="quiz-card__description">{description}</p>
          <button
            className="quiz-card__button"
            onClick={selectTypeHandle}
          >
            <span className="button-icon">🚀</span>
            <span className="button-text">Создать</span>
          </button>
        </div>
        <div className="quiz-card__image">
          <img src={imageUrl} alt={title} />
          <div className="image-overlay">
            <div className="overlay-icon">✨</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
