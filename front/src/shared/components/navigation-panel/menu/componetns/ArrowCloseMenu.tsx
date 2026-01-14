import { useState } from "react";

interface Props {
  setIsOpenMenu: (value: boolean) => void;
}

export default function ArrowCloseMenu({ setIsOpenMenu }: Props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => setIsOpenMenu(false)}
      style={{
        position: "absolute",
        height: "5%",
        top: "25px",
        left: "25px",
        fontSize: "25px",
        cursor: "pointer",
        color: isHover ? "blue" : "black",
      }}
    >
      {"-->"}
    </div>
  );
}
