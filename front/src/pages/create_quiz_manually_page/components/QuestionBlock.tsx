import { useEffect, useRef, useState } from "react";
import AnswerBlock from "./AnswerBlock";
import useAnswers from "../hooks/useAnswers";

interface Props {
  questionId: number;
  numberQuestion: number;
  onDelete: (id: number) => void;
}

export default function QuestionBlock({
  questionId,
  numberQuestion,
  onDelete,
}: Props) {
  const [isSelect, setIsSelect] = useState(false);
  const [inputQustion, setInputQustion] = useState("");
  const { answers, addAnswer, deleteAnswer, toggleCorrect } = useAnswers([
    { id: 1, numA: 1, isCorrect: false },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSelect && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSelect]);

  return (
    <div className="question-block__main-container">
      <div className="question-block__content-container">
        <h1 className="text-2xl pb-2">Вопрос {numberQuestion}</h1>
        <div
          className="absolute right-2 top-1 text-xs cursor-pointer text-red-500 hover:text-red-800"
          onClick={() => onDelete(questionId)}
        >
          Удалить
        </div>
        {isSelect === true ? (
          <div>
            <input
              onBlur={() => setIsSelect(!isSelect)}
              ref={inputRef}
              value={inputQustion}
              onChange={(e) => setInputQustion(e.target.value)}
              type="text"
              className="input w-full border rounded-sm pl-2 h-10"
            ></input>
          </div>
        ) : (
          <div>
            <label onClick={() => setIsSelect(!isSelect)} className="text-lg">
              {inputQustion === "" ? "Введите вопрос" : inputQustion}
            </label>
            <hr className="border-t border-gray-300 pt-2" />
          </div>
        )}
        <h2 className="h2__answers">Ответы:</h2>
        <div className="Answers">
          {answers.map((el) => (
            <AnswerBlock
              key={el.id}
              numA={el.numA}
              id={el.id}
              onDelete={deleteAnswer}
              isCorrect={el.isCorrect}
              toggleCorrect={toggleCorrect}
            />
          ))}
        </div>

        <button
          className="self-end w-25 h-8 bg-blue-500 rounded text-white "
          onClick={addAnswer}
        >
          Add answer
        </button>
      </div>
    </div>
  );
}
