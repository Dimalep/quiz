import styles from "./ResultsList.module.css";
import { useQuizGameAdminContext } from "../../../../../../quiz-game-context/QuizGameAdminContext";
import ResultItem from "./components/ResultItem";
import SortFilterBlock from "./components/sort-filter-block/SortFilterBlock";
import { useState } from "react";

export interface FilteredProgress {
  playerName: string;
  progress: string;
  status: string;
}

export default function ResultsList() {
  const { progresses } = useQuizGameAdminContext();

  const [progressBlock, setProgressBlock] = useState<"precent" | "quantity">(
    "quantity",
  );
  const [searchValue, setSearchValue] = useState("");

  const changedProgresses: FilteredProgress[] = [...progresses]
    .sort(
      (a, b) =>
        b.quantityCorrectAnswers / b.quantityRemainedQuestions -
        a.quantityCorrectAnswers / a.quantityRemainedQuestions,
    )
    .map((p) => ({
      playerName: p.player.nickname,
      progress:
        progressBlock === "precent"
          ? `${Math.round(
              (p.quantityCorrectAnswers / p.quantityRemainedQuestions) * 100,
            )}%`
          : `${p.quantityCorrectAnswers} из ${p.quantityRemainedQuestions}`,
      status: p.status,
    }));

  const filteredProgress = changedProgresses.filter((p) =>
    p.playerName.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className={styles.main}>
      <h3 className={styles.title}>Текущие результаты</h3>

      <SortFilterBlock
        progressBlock={progressBlock}
        setProgressBlock={setProgressBlock}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <div className={styles.list}>
        {!filteredProgress || filteredProgress.length === 0
          ? "Список пуст"
          : filteredProgress.map((el, index) => (
              <ResultItem key={index} progress={el} />
            ))}
      </div>
    </div>
  );
}
