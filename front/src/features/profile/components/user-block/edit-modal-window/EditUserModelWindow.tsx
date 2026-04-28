import { useState } from "react";
import EditInputField from "./edit-input-field/EditInputField";
import styles from "./EditUserModelWindow.module.css";
import { useAuthContext } from "../../../../../shared/components/AuthProvider";
import type { AuthResponse } from "../../../../../core/api/user-service/useAuth";

interface Props {
  setIsOpen: (value: boolean) => void;
}

export default function EditUserModelWindow({ setIsOpen }: Props) {
  const { currentUser, patchUserHandler } = useAuthContext();

  const [login, setLogin] = useState(currentUser?.username ?? "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(currentUser?.email ?? "");

  const [error, setError] = useState<AuthResponse | null>(null);

  const saveHandler = async () => {
    const data = await patchUserHandler({
      username: login,
      password: password,
    });

    if (data !== undefined) {
      setError(data);
      return;
    }

    setIsOpen(false);
  };

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div
        className={styles.main}
        onClick={(e) => {
          e.stopPropagation();
          setError(null);
        }}
      >
        <div className={styles.title}>
          <h4>Редактирование</h4>
        </div>

        {error && (
          <div className={styles.error}>
            <label>{error.message}</label>
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.logo}>
            <div className={styles.img}></div>
            <button>Изменить фото</button>
          </div>

          <div className={styles.info}>
            <EditInputField
              title="Имя пользователя"
              value={login}
              onChange={setLogin}
            />
            <EditInputField
              title="Почта"
              value={email}
              onChange={setEmail}
              isReadonly={true}
            />

            <EditInputField
              title="Пароль"
              value={password}
              onChange={setPassword}
            />
          </div>
        </div>

        <div className={styles.btns}>
          <button
            className={styles.cancel_btn}
            onClick={() => setIsOpen(false)}
          >
            Отмена
          </button>
          <button className={styles.save_btn} onClick={saveHandler}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
