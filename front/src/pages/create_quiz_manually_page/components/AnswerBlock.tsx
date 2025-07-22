import { useEffect, useRef, useState } from "react";

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
}: Props) {
  const [inputAnswer, setInputAnswer] = useState("");
  const [isSelect, setIsSelect] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSelect && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSelect]);

  return (
    <div className="answer-main-container">
      <div className="flex flex-col">
        <em
          className="cursor-pointer"
          onClick={() => {
            toggleCorrect(id);
          }}
        >
          {isCorrect ? "верно" : "неверно"}
        </em>
        <div className="relative flex flex-row">
          <h2>{`${numA}) `}</h2>
          {isSelect ? (
            <input
              ref={inputRef}
              type="text"
              onBlur={() => setIsSelect(!isSelect)}
              className="input w-full border rounded-sm pl-2 h-8"
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
            ></input>
          ) : (
            <label onClick={() => setIsSelect(!isSelect)}>
              {inputAnswer === "" ? "Нажми для ввода" : inputAnswer}
            </label>
          )}
          <div className="absolute pl-2 pr-2 right-2 cursor-pointer hover:bg-gray-200">
            ⁝
          </div>
        </div>
      </div>
    </div>
  );
}
