import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../../../shared/icons/Logo";
import Profile from "../../../../shared/icons/Profile";
import { useAuthContext } from "../../../../shared/components/AuthProvider";

import styles from "./Header.module.css";
import Logout from "../../../../shared/icons/Logout";
import Login from "../../../../shared/icons/Login";
import Success from "../../../../shared/icons/Success";
import Unsuccess from "../../../../shared/icons/Unsuccess";

export default function Header() {
  const { isAuthenticated, logoutHandler, currentUser } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className={styles.main}>
      <Logo />

      <div className={styles.profile} onClick={() => setIsOpen((p) => !p)}>
        <div>
          {isAuthenticated ? <Success /> : <Unsuccess />}
          <Profile />
        </div>

        {isOpen && (
          <div className={styles.dropdown}>
            {isAuthenticated ? (
              <>
                <div className={styles.user}>
                  <div className={styles.username_block}>
                    <span className={styles.label}>username</span>
                    <span className={styles.name}>{currentUser?.username}</span>
                  </div>

                  <button
                    className={styles.secondary_btn}
                    onClick={() => navigate("/profile")}
                  >
                    <Profile />
                    <label>Профиль</label>
                  </button>
                </div>

                <button className={styles.logout_btn} onClick={logoutHandler}>
                  <Logout />
                  <label>Выйти</label>
                </button>
              </>
            ) : (
              <button
                className={styles.login_btn}
                onClick={() => navigate("/auth")}
              >
                <Login />
                <label>Войти</label>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
