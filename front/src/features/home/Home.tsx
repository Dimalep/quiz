import ConnectToQuiz from "./components/connect-to-quiz/ConnectToQuiz";
import CreateQuiz from "./components/create-quiz/CreateQuiz";
import Library from "./components/library/Library";
import styles from "./Home.module.css";
import Header from "./components/header/Header";
import CreateImage from "./components/create-image/CreateImage";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <Header />

        <ConnectToQuiz />

        <div className={styles.create_and_profile}>
          <CreateImage />
          <CreateQuiz />
        </div>

        <Library />
      </div>
    </div>
  );
}
