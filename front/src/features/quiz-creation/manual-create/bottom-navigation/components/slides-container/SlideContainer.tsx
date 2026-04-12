import { useCreateContext } from "../../../create-context/CreateProvider";
import Slide from "./components/Slide";
import styles from "./SlideContainer.module.css";

export default function SlideContainer() {
  const { state } = useCreateContext();
  return (
    <div className={styles.main}>
      <Slide number={0} />
      {state.quiz?.questions?.map((el) => (
        <Slide number={el.index} key={el.index} />
      ))}
    </div>
  );
}
