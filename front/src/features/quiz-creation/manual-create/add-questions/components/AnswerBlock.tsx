import { useEffect, useRef, useState } from "react";
import ContextMenuAnswer from "./ContextMenuAnswer";

interface Props {
  id: number;
  numA: number;
  onDelete: (id: number) => void;
  isCorrect: boolean;
  toggleCorrect: (id: number) => void;
}

export default function AnswerBlock({
  id,
  numA,
  isCorrect,
  toggleCorrect,
  onDelete,
}: Props) {
  const [contextMenuIsOpen, setContextMenuIsOpen] = useState(false);
  const [inputAnswer, setInputAnswer] = useState("");
  const [isSelect, setIsSelect] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSelect && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSelect]);

  const handleToggleCorrect = () => {
    toggleCorrect(id);
  };

  const handleInputBlur = () => {
    setIsSelect(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAnswer(e.target.value);
  };

  const handleEditClick = () => {
    setIsSelect(true);
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <div className="answer-block">
      <div className="answer-content">
        {/* Answer Number and Correctness Toggle */}
        <div className="answer-header">
          <span className="answer-number">{numA})</span>

          <button
            className={`correctness-toggle ${
              isCorrect ? "correct" : "incorrect"
            }`}
            onClick={handleToggleCorrect}
            title={isCorrect ? "Правильный ответ" : "Неправильный ответ"}
          >
            {isCorrect ? "✓" : "✗"}
          </button>
        </div>

        {/* Answer Input/Display */}
        <div className="answer-input-section">
          {isSelect ? (
            <div className="input-wrapper">
              <input
                ref={inputRef}
                type="text"
                onBlur={handleInputBlur}
                className="answer-input"
                value={inputAnswer}
                onChange={handleInputChange}
                placeholder="Введите текст ответа..."
              />
              <button className="btn-save-answer" onClick={handleInputBlur}>
                ✓
              </button>
            </div>
          ) : (
            <div className="answer-display" onClick={handleEditClick}>
              {inputAnswer.trim() === "" ? (
                <span className="placeholder">Нажмите для ввода ответа</span>
              ) : (
                <span className="answer-text">{inputAnswer}</span>
              )}
            </div>
          )}
        </div>

        {/* Answer Actions */}
        <div className="answer-actions">
          <button
            className="btn-edit"
            onClick={handleEditClick}
            title="Редактировать"
          >
            ✏️
          </button>

          <button
            className="btn-delete"
            onClick={handleDeleteClick}
            title="Удалить"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Context Menu (keeping existing functionality) */}
      <ContextMenuAnswer
        isOpen={contextMenuIsOpen}
        setIsOpen={setContextMenuIsOpen}
        elementId={id}
        onDelete={onDelete}
      />
    </div>
  );
}
