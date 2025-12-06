import { useEffect, useState } from "react";
import NavigationPanel from "../../../shared/components/navigation-panel/NavigationPanel";
// styles
import "./styles/base.css";
import "./styles/responsive.css";
import useSessionStorage from "../../../core/hooks/useSessionStorage";

export default function WaitingRoomPlayers() {
  const [inputName, setInputName] = useState("");
  const { getItemFromSS } = useSessionStorage();

  useEffect(() => {
    const idUser = getItemFromSS("anonUserId");
    setInputName(`anonymous${idUser}`);
  }, []);

  return (
    <div className="waiting-room-players__main-container">
      <NavigationPanel>
      </NavigationPanel>

      <div className="waiting-room-players__content">
        <h2 className="waiting-room-players__title">Комната ожидания</h2>

        <div className="waiting-room-players__room-code">
          Код комнаты: <span className="code">7QK5-XY</span>
        </div>

        <div className="waiting-room-players__input-name">
          <form>
            <label>Name</label>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Введи имя"
            ></input>
          </form>
        </div>

        <hr />

        <ul className="waiting-room-players__list">
          <li className="waiting-room-players__player ready">Alex (готов)</li>
          <li className="waiting-room-players__player not-ready">
            Maria (не готова)
          </li>
        </ul>

        <div className="waiting-room-players__actions">
          <button className="btn exit">Выйти</button>
        </div>
      </div>
    </div>
  );
}
