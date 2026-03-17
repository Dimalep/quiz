import { useState } from "react";
import { useProfileContext } from "../../ProfileProvider";
import styles from "./UserBlock.module.css";
import InfoWindow from "./components/InfoWindow";

export default function UserBlock() {
  const [isOpenModalWindow, setIsOpenModalWindow] = useState(false);

  const openEditWindow = () => {
    setIsOpenModalWindow(true);
  };

  const { me } = useProfileContext();

  const email = me?.email ? me?.email : "Не указано";
  const phone = me?.phone ? me?.phone : "Не указано";

  return (
    <div className={styles.main}>
      <div className={styles.name_and_logo}>
        <div className={styles.logo}>logo</div>
        <div className={styles.name} onClick={openEditWindow}>
          <span>Логин</span>
          <label>{me?.username}</label>
        </div>
      </div>

      <div className={styles.more_info}>
        <div className={styles.info_card} onClick={openEditWindow}>
          <span>Эл. почта</span>
          <label>{email}</label>
        </div>

        <div className={styles.info_card} onClick={openEditWindow}>
          <span>Телефон</span>
          <label>{phone}</label>
        </div>
      </div>

      <InfoWindow isOpen={isOpenModalWindow} setIsOpen={setIsOpenModalWindow} me={me}/>
    </div>
  );
}
