import Email from "../../../../shared/icons/Email";
import { useProfileContext } from "../../ProfileProvider";
import styles from "./UserBlock.module.css";

export default function UserBlock() {
  const { me } = useProfileContext();

  const email = me?.email ? me?.email : "Не указано";

  return (
    <div className={styles.main}>
      {/* logo */}
      <div className={styles.logo}></div>
      {/* name */}
      <div className={styles.name}>
        <span>Пользователь</span>
        <label>{me?.username}</label>
      </div>
      {/* email */}
      <div className={styles.email}>
        <Email />
        <div>
          <span>Эл. почта</span>
          <label>{email}</label>
        </div>
      </div>

      {/* info */}
      <div className={styles.statistics}></div>
    </div>
  );
}
