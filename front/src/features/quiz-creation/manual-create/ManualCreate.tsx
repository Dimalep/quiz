import TopNavigation from "./top-navigation/TopNavigation";
import BottomNavigation from "./bottom-navigation/BottomNavigation";
import Content from "./content/Content";
import CreateProvider from "./create-context/CreateProvider";
import styles from "./ManualCreate.module.css";

export default function ManualCreate() {
  return (
    <div className={styles.main}>
      <CreateProvider>
        <TopNavigation />
        <Content />
        <BottomNavigation />
      </CreateProvider>
    </div>
  );
}
