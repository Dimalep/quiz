import { useState } from "react";
import Content from "./components/content/Content";
import LeftMenu from "./components/left-menu/LeftMenu";
import Search from "./components/search-block/Search";
import UserBlock from "./components/user-block/UserBlock";
import styles from "./Profile.module.css";
import ProfileProvider from "./ProfileProvider";

export type FilterDate = "new" | "old";

export default function Profile() {
  const [filterDate, setFilterDate] = useState<FilterDate>("new");

  return (
    <ProfileProvider>
      <div className={styles.main}>
        {/* Info about user */}
        <div className={styles.main1}>
          <UserBlock />
        </div>
        {/* quizzes and historu lists */}
        <div className={styles.main2}>
          <Search filterDate={filterDate} setFilterDate={setFilterDate} />
          <div className={styles.content}>
            <LeftMenu />
            <Content filterDate={filterDate} />
          </div>
        </div>
      </div>
    </ProfileProvider>
  );
}
