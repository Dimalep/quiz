import SlideContainer from "./components/slides-container/SlideContainer";
import styles from "./BottomNavigation.module.css";
import { useCreateContext } from "../create-context/CreateProvider";

export default function BottomNavigation() {
  const { dispatch } = useCreateContext();

  return (
    <div className={styles.main}>
      <SlideContainer />
      <div className={styles.add_block}>
        <span>|</span>
        <button
          className={styles.add_button}
          onClick={() => dispatch({ type: "OPEN_CHOSE" })}
        >
          +
        </button>
      </div>
    </div>
  );
}
