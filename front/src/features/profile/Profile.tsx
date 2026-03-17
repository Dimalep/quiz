import Content from "./components/content/Content";
import LeftMenu from "./components/left-menu/LeftMenu";
import SearchMyQuiz from "./components/search-block/SearchMyQuiz";
import UserBlock from "./components/user-block/UserBlock";
import styles from "./Profile.module.css";
import ProfileProvider from "./ProfileProvider";

export default function Profile() {
  return (
    <ProfileProvider>
      <div className={styles.main}>
        <div className={styles.main1}>
          <UserBlock />
        </div>
        <div className={styles.main2}>
          <SearchMyQuiz />
          <div className={styles.content}>
            <LeftMenu />
            <Content />
          </div>
        </div>
      </div>
    </ProfileProvider>
  );
}
