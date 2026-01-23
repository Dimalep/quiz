import type { CSSProperties } from "react";
import SwitchLine from "./components/SwitchLine";

interface Props {
  setType: (value: number) => void;
  type: number;
}

export default function Switcher({ setType, type }: Props) {
  return (
    <div style={styles.main}>
      <SwitchLine type={type} setType={setType} />
      <SwitchLine type={type} setType={setType} />
    </div>
  );
}

const styles = {
  main: { display: "flex", gap: 10 } as CSSProperties,
};
