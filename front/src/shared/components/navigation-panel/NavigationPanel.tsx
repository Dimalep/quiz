import type { ReactNode } from "react";
//Styles
import "./navigation_panel_styles.css";
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
