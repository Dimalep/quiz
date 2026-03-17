import Button from "./components/Button";
import Description from "./components/Description";
import VideoBlock from "./components/VideoBlock";
import styles from "./Content.module.css";

export default function Content() {
  return (
    <div className={styles.main}>
      <VideoBlock />
      <Description />
      <Button />
    </div>
  );
}
