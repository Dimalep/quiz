import { useState } from "react";
import { useAuthContext } from "../../../../shared/components/AuthProvider";
import Email from "../../../../shared/icons/Email";
import styles from "./UserBlock.module.css";
import EditUserModelWindow from "./edit-modal-window/EditUserModelWindow";

export default function UserBlock() {
  const [isOpen, setIsOpen] = useState(false);

  const { currentUser } = useAuthContext();

  if (!currentUser) return <h4>Получение данных о пользователе..</h4>;

  const email = currentUser.email ? currentUser.email : "Не указано";

  return (
    <div className={styles.main}>
      {/* logo */}
      <div className={styles.logo}></div>
      {/* name */}
      <div className={styles.name}>
        <span>Пользователь</span>
        <label>{currentUser.username}</label>
      </div>
      {/* email */}
      <div className={styles.email}>
        <Email />
        <div>
          <span>Эл. почта</span>
          <label>{email}</label>
        </div>
      </div>

      <button
        className={styles.edit_btn}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        🖍️
      </button>

      {isOpen && <EditUserModelWindow setIsOpen={setIsOpen} />}
    </div>
  );
}
