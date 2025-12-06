//styles
import { useAuthContext } from "../../../AuthProvider";
import "./styles/base.css";
import "./styles/responsive.css";

interface Props {
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Menu({ setIsOpenMenu }: Props) {
  const {logout} = useAuthContext();

  const handleClickCloseMenu = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpenMenu(false);
  };

  const handlerClickLogout = () => {
    logout();
  } 
  return (
    <div className="menu__main-container">
      <div className="menu__content">
        <div className="menu__part-right">1</div>
        <div className="menu__part-left">
          <h2>Name</h2>
          <h3>Настройки</h3>
          <button onClick={handlerClickLogout}>Выйти</button>
        </div>
      </div>
      <div className="menu__close">
        <div onClick={handleClickCloseMenu}>
          <img src="https://cdn.ui.porsche.com/porsche-design-system/icons/close.eec3c5d.svg" />
        </div>
      </div>
      <div className="menu_empty"></div>
    </div>
  );
}
