import { useState, type Dispatch } from "react";
import styles from "./InfoWidnow.module.css";
import type React from "react";
import type { User } from "../../../../../core/api/user-service/useUser";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  me: User | undefined;
}

export default function InfoWindow({ isOpen, setIsOpen, me }: Props) {
  const [username, setUsername] = useState(me?.username ? me?.username : "");
  const [email, setEmail] = useState(me?.email ? me?.email : "");
  const [phone, setPhone] = useState(me?.phone ? me?.phone : "");

  const closeHandler = () => {
    setIsOpen(false);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation(); // чтобы клик внутри окна не закрывал его
  };

  return (
    <div className={isOpen ? styles.open : styles.close} onClick={closeHandler}>
      <div className={styles.content} onClick={stopPropagation}>
        <div className={styles.card}>
          <span>Логин</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.card}>
          <span>Эл. почта</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.card}>
          <span>Телефон</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <button className={styles.apply} onClick={closeHandler}>
          Применить
        </button>
      </div>
    </div>
  );
}
