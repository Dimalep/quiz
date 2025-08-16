import type { ReactNode } from "react";
//Styles
import "./styles/base.css";
import "./styles/responsive.css";
import { useNavigate } from "react-router-dom";

interface Props {
  className: string;
  children: ReactNode;
}

export default function NavigationPanel({ className, children }: Props) {
  const navigate = useNavigate();

  return (
    <nav className="navigation-panel">
      <div
        className={`navigation-panel__logo ${className}`}
        onClick={() => navigate("/")}
      >
        Quiz
      </div>
      <div className={`navigation-items`}>{children}</div>
    </nav>
  );
}
