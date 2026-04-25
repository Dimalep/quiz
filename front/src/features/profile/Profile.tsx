import Content from "./components/content/Content";
import LeftMenu from "./components/left-menu/LeftMenu";
import UserBlock from "./components/user-block/UserBlock";
import styles from "./Profile.module.css";
import ProfileProvider from "./ProfileProvider";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <ProfileProvider>
      <div className={styles.global_main}>
        <div className={styles.header}>
          <button className={styles.main_btn} onClick={() => navigate("/")}>
            Главная
          </button>
          <button className={styles.profile_btn}>Профиль</button>
        </div>

        <div className={styles.main}>
          <UserBlock />

          <div className={styles.content}>
            <LeftMenu />
            <Content />
          </div>
        </div>
      </div>
    </ProfileProvider>
  );
}
