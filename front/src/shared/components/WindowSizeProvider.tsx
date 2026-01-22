import { createContext, useContext } from "react";
import useWindowSize from "../../core/hooks/useWindowSize";

interface WidnowSizeType {
  width: number;
}

const WindowSizeContext = createContext<WidnowSizeType | undefined>(undefined);

export default function WindowSizeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { width } = useWindowSize();

  return (
    <WindowSizeContext.Provider value={{ width }}>
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
