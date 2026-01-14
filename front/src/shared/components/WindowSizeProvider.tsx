import { createContext, useContext } from "react";
import useWindowSize from "../../core/hooks/useWindowSize";

interface WidnowSizeType {
  width: number;
  height: number;
}

const WindowSizeContext = createContext<WidnowSizeType | undefined>(undefined);

export default function WindowSizeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { height, width } = useWindowSize();

  return (
    <WindowSizeContext.Provider value={{ width, height }}>
      {children}
    </WindowSizeContext.Provider>
  );
}

export const useWindowSizeContext = () => {
  const context = useContext(WindowSizeContext);
  if (!context) {
    throw new Error("useWindowSize must be used within WindowSizeContenxt");
  }
  return context;
};
