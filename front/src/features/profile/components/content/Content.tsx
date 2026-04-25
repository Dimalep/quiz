import styles from "./Content.module.css";
import Search from "../../../../shared/icons/Search";
import { useProfileContext } from "../../ProfileProvider";
import QuizItem from "./components/quiz-item.tsx/QuizItem";
import GameItem from "./components/game-item/GameItem";
import { useState } from "react";
// import type { Quiz } from "../../../quiz-creation/manual-create/create-context/reducer";

export default function Content() {
  const { myQuizzes, mode, games, createQuiz } = useProfileContext();

  // const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const quizzes = myQuizzes;

  const filteredQuizzes = quizzes?.filter((quiz) =>
    (quiz.title + quiz.description)
      .toLowerCase()
      .includes(searchValue.toLowerCase()),
  );

  const filteredGames = games?.filter((game) =>
    game.quiz.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const list =
    mode === "quizzes" ? (
      filteredQuizzes?.length === 0 ? (
        <label>Ничего не найдено</label>
      ) : (
        filteredQuizzes?.map((el) => <QuizItem key={el.id} quiz={el} />)
      )
    ) : filteredGames?.length === 0 ? (
      <label>Ничего не найдено</label>
    ) : (
      filteredGames?.map((el) => <GameItem key={el.id} game={el} />)
    );

  // const filter_dropdown = <div className={styles.filter}>while empty</div>;

  return (
    <div className={styles.main}>
      <div className={styles.settings}>
        <div className={styles.search_block}>
          <Search />
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder="Поиск по названию квиза"
          />
        </div>

        {/* <button
          className={styles.filter_btn}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Фильтр
        </button> */}

        {mode === "quizzes" && (
          <button className={styles.create_btn} onClick={createQuiz}>
            + создать квиз
          </button>
        )}
      </div>

      {/* {isOpen && filter_dropdown} */}

      <div className={styles.list} data-lenis-prevent>
        {list}
      </div>
    </div>
  );
}
