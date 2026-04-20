import styles from "./CreateImage.module.css";
import createSettingsImg from "../../../../shared/img/settings.png";
import createCreateImg from "../../../../shared/img/create.png";
import createCompleteImg from "../../../../shared/img/complete.png";

export default function CreateImage() {
  return (
    <div className={styles.main}>
      <div className={styles.settings_img}>
        <img src={createSettingsImg} />
      </div>
      <div className={styles.create_img}>
        <img src={createCreateImg} />
      </div>
      <div className={styles.complete_img}>
        <img src={createCompleteImg} />
      </div>
    </div>
  );
}
