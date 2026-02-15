import SlideContainer from "./components/slides-container/SlideContainer";
import styles from "./BottomNavigation.module.css";

export default function BottomNavigation() {
  return (
    <div className={styles.main}>
      <SlideContainer />
      <button className={styles.add_button}>+</button>
    </div>
  );
}
