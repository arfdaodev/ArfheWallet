import React, { createContext, useState, useContext } from "react";

interface ArfBarContextType {
  title: string,
  text: string,
  setTitle: (value: string) => void;
  setText: (value: string) => void;
}

const ArfBarContext = createContext<ArfBarContextType | undefined>(undefined);

export const useArfBar = () => {
  const ctx = useContext(ArfBarContext);
  if (!ctx) throw new Error("useArfBar must be used inside ArfBarProvider");
  return ctx;
}

export const ArfBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState("Default");
  const [text, setText] = useState("0x000000000");

  return (
    <ArfBarContext.Provider value={{ title, setTitle, text, setText }}>
      {children}
    </ArfBarContext.Provider>
  );
};