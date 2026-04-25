import React, { createContext, useContext, useState } from "react";

interface ContextType {
  quizThema: string | null;
}

const Context = createContext<ContextType | undefined>(undefined);

export default function AiGenerateContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [quizThema, setQuizThema] = useState<string | null>(null);

  return <Context.Provider value={{ quizThema }}>{children}</Context.Provider>;
}

//#region HOOK
export const useGeneratorContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useCreateContext err");
  }
  return context;
};
//#endregion
