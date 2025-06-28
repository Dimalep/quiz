import React from "react";

//Styles
import "../styles/animated_container_styles.css";

interface Props {
  direction: "left" | "right";
  inProp: boolean;
  children: React.ReactNode;
}

export default function AnimatedContainer({
  direction,
  inProp,
  children,
}: Props) {
  return (
    <div
      className={`page-slide ${
        inProp ? `slide-in-${direction}` : `slide-out-${direction}`
      }`}
    >
      {children}
    </div>
  );
}
