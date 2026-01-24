import React, { createContext, useContext, type Dispatch } from "react";
import useCreate from "../../../core/hooks/useCreate";

interface CreateContextType {
  currentQuestionId: number;
  setCurrentQuestionId: Dispatch<React.SetStateAction<number>>;
}

const CreateContext = createContext<CreateContextType | undefined>(undefined);

export default function CreateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentQuestionId, setCurrentQuestionId } = useCreate();
  return (
    <CreateContext.Provider
      value={{
        currentQuestionId,
        setCurrentQuestionId,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
}

export const useCreateContext = () => {
  const context = useContext(CreateContext);
  if (!context) {
    throw new Error("useCreateContext err");
  }
  return context;
};
