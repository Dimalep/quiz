import { useState } from "react";
import styles from "./SortFilterBlock.module.css";
import Search from "../../../../../../../../../../shared/icons/Search";
import Progress from "../../../../../../../../../../shared/icons/Progress";

type ActiveBlock = "search" | "progress" | "status" | null;

interface Props {
  searchValue: string;
  progressBlock: "precent" | "quantity";
  setProgressBlock: (value: "precent" | "quantity") => void;
  setSearchValue: (value: string) => void;
}

export default function SortFilterBlock({
  progressBlock,
  setProgressBlock,
  searchValue,
  setSearchValue,
}: Props) {
  const [activeBlock, setActiveBlock] = useState<ActiveBlock>(null);

  const isOpen = activeBlock === "progress";

  const toggle = (block: ActiveBlock) => {
    setActiveBlock((prev) => (prev === block ? null : block));
  };

  return (
    <div className={styles.main}>
      {/* SEARCH */}
      <div className={styles.search_block}>
        <div className={styles.header} onClick={() => toggle("search")}>
          <Search />
        </div>
        {activeBlock === "search" && (
          <div className={styles.content}>
            <input
              placeholder="Поиск по имени..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* PROGRESS */}
      <div className={styles.progress_block}>
        <div className={styles.header} onClick={() => toggle("progress")}>
          <Progress />
          {progressBlock === "precent" ? "%" : "#"}
        </div>

        {isOpen && (
          <div className={styles.dropdown_progress}>
            <button onClick={() => setProgressBlock("precent")}>
              Проценты
            </button>
            <button onClick={() => setProgressBlock("quantity")}>
              Количество вопросов
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
