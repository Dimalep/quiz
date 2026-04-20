import { useState } from "react";
import type { ProgressForAdmin } from "../../../../../core/api/quiz-game-service/useProgress";
import MainContainerGame from "../../../common-components/main-container-game/MainContainerGame";
import styles from "./BigResultList.module.css";
import BigResultItem from "./components/BigResultItem";

export type ResultType = "precent" | "quantity" | "grade";

export type ResultUI = {
  playerName: string;
  result: string;
};

interface Props {
  progresses: ProgressForAdmin[] | undefined;
}

export default function BigResultList({ progresses }: Props) {
  const [resultType, setResultType] = useState<ResultType>("quantity");
  const [isOpenResult, setIsOpenResult] = useState(false);
  const [grade5, setGrade5] = useState(80);
  const [grade4, setGrade4] = useState(60);
  const [grade3, setGrade3] = useState(40);

  const options = [90, 80, 70, 60, 50, 40, 30, 20, 10];

  const handleSelect = (type: ResultType) => {
    setResultType(type);
    setIsOpenResult(false);
  };

  const convertResultType = (value: ResultType): string => {
    switch (value) {
      case "grade":
        return "Результат в оценке";
      case "quantity":
        return "Результат в количестве правильных ответов";
      case "precent":
        return "Результат в процентах";
    }
  };

  console.log(progresses);

  if (!progresses) return null;

  const filteredList: ResultUI[] = progresses.map((p) => {
    let result = "";

    const total = p.quantityAnsweredQuestions;
    const correct = p.quantityCorrectAnswers;

    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

    if (resultType === "quantity") {
      result = `${correct} из ${total}`;
    }

    if (resultType === "precent") {
      result = `${percent}%`;
    }

    if (resultType === "grade") {
      if (percent >= grade5) result = "5";
      else if (percent >= grade4) result = "4";
      else if (percent >= grade3) result = "3";
      else result = "2";
    }

    return {
      playerName: p.player.nickname,
      result,
    };
  });

  console.log(filteredList);

  return (
    <MainContainerGame title="Результаты" defualtContent={false}>
      <div className={styles.main}>
        {/* settings */}
        <div className={styles.settings}>
          <div className={styles.settings_result}>
            {/* header */}
            <div className={styles.settings_result_header}>
              {/* select */}
              <div
                className={styles.title}
                onClick={() => setIsOpenResult((prev) => !prev)}
              >
                {convertResultType(resultType)} {isOpenResult ? "⏶" : "⏷"}
              </div>

              {/* grade settings */}
              {resultType === "grade" && (
                <div
                  className={styles.settings_grade}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.grade_item}>
                    <span>Оценка 5 с</span>
                    <select
                      value={grade5}
                      onChange={(e) => setGrade5(Number(e.target.value))}
                    >
                      {options.map((o) => (
                        <option key={o} value={o}>
                          {o}%
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.grade_item}>
                    <span>Оценка 4 с</span>
                    <select
                      value={grade4}
                      onChange={(e) => setGrade4(Number(e.target.value))}
                    >
                      {options.map((o) => (
                        <option key={o} value={o}>
                          {o}%
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.grade_item}>
                    <span>Оценка 3 с</span>
                    <select
                      value={grade3}
                      onChange={(e) => setGrade3(Number(e.target.value))}
                    >
                      {options.map((o) => (
                        <option key={o} value={o}>
                          {o}%
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* dropdown */}
            {isOpenResult && (
              <div
                className={styles.dropdown}
                onClick={(e) => e.stopPropagation()} // 🔥 важно
              >
                <button onClick={() => handleSelect("precent")}>
                  Проценты
                </button>
                <button onClick={() => handleSelect("quantity")}>
                  Количество
                </button>
                <button onClick={() => handleSelect("grade")}>Оценка</button>
              </div>
            )}
          </div>
        </div>

        {/* list */}
        {!filteredList || filteredList.length === 0 ? (
          <label>Список пуст</label>
        ) : (
          filteredList.map((el, index) => (
            <BigResultItem key={index} progress={el} resultType={resultType} />
          ))
        )}
      </div>
    </MainContainerGame>
  );
}
