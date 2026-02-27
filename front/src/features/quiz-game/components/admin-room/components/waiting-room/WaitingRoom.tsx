import PlayersList from "./components/players-list/PlayersList";
import SettingsSession from "./components/SettingsSession";
import styles from "./WaitingRoom.module.css";
import ConnectInfo from "./components/ConnectInfo";

export default function WaitingRoom() {
  return (
    <div className={styles.main}>
      <SettingsSession />

      <div className={styles.description}>
        <div className={styles.info}>
          <header>Описание</header>
          <span>Data</span>
        </div>

        <ConnectInfo />
      </div>

      <PlayersList />
    </div>
  );
}
