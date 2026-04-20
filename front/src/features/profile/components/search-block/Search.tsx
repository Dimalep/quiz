import { useState } from "react";
import Filter from "../../../../shared/icons/Filter";
import { useProfileContext } from "../../ProfileProvider";
import styles from "./Search.module.css";
import type { FilterDate } from "../../Profile";

interface Props {
  filterDate: "new" | "old";
  setFilterDate: (value: "new" | "old") => void;
}

export default function Search({ filterDate, setFilterDate }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { mode } = useProfileContext();

  if (mode === "history_games")
    return (
      <>
        <div className={styles.main}>
          <input
            className={styles.input_search}
            type="text"
            placeholder={"Найти игру..."}
          />

          <div
            className={styles.ico_filter}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <Filter />
          </div>
          {isOpen && (
            <div className={styles.filter}>
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value as FilterDate)}
              >
                <option value={"new"}>Сначала новые</option>
                <option value={"old"}>Сначала старые</option>
              </select>
            </div>
          )}
        </div>
      </>
    );
  else if (mode === "quizzes")
    return (
      <div className={styles.main}>
        <input
          className={styles.input_search}
          type="text"
          placeholder={"Найти квиз..."}
        />

        <div className={styles.ico_filter}>
          <Filter />
        </div>
      </div>
    );
}
