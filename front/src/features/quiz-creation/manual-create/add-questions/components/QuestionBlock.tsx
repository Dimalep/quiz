import { useEffect, useRef, useState } from "react";
import AnswerBlock from "./AnswerBlock";
import useAnswers from "../../../../../core/hooks/useAnswers";
import type { Question } from "../../../../../core/models/Questoin";

interface Props {
  questionId: number;
  numberQuestion: number;
  onDelete: (id: number) => void;
  onEdit: (updatingQuestion: Question) => void;
  quizId: number;
  isLast?: boolean;
}

export default function QuestionBlock({
  questionId,
  numberQuestion,
  onDelete,
  onEdit,
  quizId,
  isLast = false,
}: Props) {
  const [isSelect, setIsSelect] = useState(false);
  const [inputQuestion, setInputQuestion] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const { answers, addAnswer, deleteAnswer, toggleCorrect } = useAnswers([
    { id: 1, numA: 1, isCorrect: false, value: "" },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSelect && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSelect]);

  const handleOnBlur = () => {
    setIsSelect(false);
    const updatingQuestion: Question = {
      tmpid: questionId,
      numQ: numberQuestion,
      value: inputQuestion,
      quizId: quizId,
    };
    onEdit(updatingQuestion);
  };

  const handleAddAnswer = () => {
    addAnswer();
  };

  const handleDeleteAnswer = (answerId: number) => {
    if (answers.length > 1) {
      deleteAnswer(answerId);
    }
  };

  const hasValidAnswers = answers.some(answer => answer.value.trim() !== "");
  const hasCorrectAnswer = answers.some(answer => answer.isCorrect);

  return (
    <div className="question-block">
      <div className="question-header">
        <div className="question-number">
          <span className="number-badge">{numberQuestion}</span>
          <h3>Вопрос {numberQuestion}</h3>
        </div>
        
        <div className="question-actions">
          <button
            className="btn-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Свернуть" : "Развернуть"}
          >
            {isExpanded ? "−" : "+"}
          </button>
          
          <button
            className="btn-delete"
            onClick={() => onDelete(questionId)}
            title="Удалить вопрос"
            disabled={isLast && numberQuestion === 1}
          >
            🗑️
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="question-content">
          {/* Question Input */}
          <div className="question-input-section">
            <label className="question-label">Текст вопроса:</label>
            {isSelect ? (
              <div className="input-wrapper">
                <input
                  onBlur={handleOnBlur}
                  ref={inputRef}
                  value={inputQuestion}
                  onChange={(e) => setInputQuestion(e.target.value)}
                  type="text"
                  className="question-input"
                  placeholder="Введите текст вопроса..."
                />
                <button 
                  className="btn-save-input"
                  onClick={handleOnBlur}
                >
                  ✓
                </button>
              </div>
            ) : (
              <div 
                className="question-display"
                onClick={() => setIsSelect(true)}
              >
                {inputQuestion.trim() === "" ? (
                  <span className="placeholder">Нажмите для ввода вопроса</span>
                ) : (
                  <span className="question-text">{inputQuestion}</span>
                )}
              </div>
            )}
          </div>

          {/* Answers Section */}
          <div className="answers-section">
            <div className="answers-header">
              <h4>Ответы:</h4>
              <div className="answers-status">
                {hasValidAnswers && (
                  <span className={`status-badge ${hasCorrectAnswer ? 'valid' : 'warning'}`}>
                    {hasCorrectAnswer ? '✓ Готово' : '⚠️ Нужен правильный ответ'}
                  </span>
                )}
              </div>
            </div>
            
            <div className="answers-list">
              {answers.map((answer) => (
                <AnswerBlock
                  key={answer.id}
                  numA={answer.numA}
                  id={answer.id}
                  onDelete={handleDeleteAnswer}
                  isCorrect={answer.isCorrect}
                  toggleCorrect={toggleCorrect}
                />
              ))}
            </div>

            <button
              className="btn-add-answer"
              onClick={handleAddAnswer}
            >
              <span className="btn-icon">➕</span>
              Добавить ответ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
